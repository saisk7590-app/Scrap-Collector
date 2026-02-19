const supabase = require('../config/supabase');

/* =======================
   REGISTER
======================= */
exports.register = async (req, res) => {
    try {
        const { email, password, fullName, phone, role } = req.body;

        if (!email || !password || !fullName || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 1. Sign up user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    phone: phone,
                    role: role || 'customer'
                }
            }
        });

        if (authError) {
            return res.status(400).json({ message: authError.message });
        }

        // 2. Create profile in 'profiles' table (triggered by DB function usually, but safe to check/do here if needed)
        // Note: In Supabase, it's best practice to use a trigger to create a profile.
        // Assuming the profiles table has a matching trigger.

        res.status(201).json({
            message: "User registered successfully. Please check your email for verification.",
            user: authData.user
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   LOGIN
======================= */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            return res.status(401).json({ message: error.message });
        }

        res.json({
            message: "Login successful",
            session: data.session,
            user: data.user
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   RECOVER PASSWORD
======================= */
exports.recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        res.json({ message: "Password reset email sent" });
    } catch (error) {
        console.error("RECOVERY ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};
