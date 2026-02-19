const supabase = require('../config/supabase');

/* =======================
   CREATE PICKUP (Customer)
======================= */
exports.createPickup = async (req, res) => {
    try {
        const { items, totalQty, totalWeight, alternateNumber, timeSlot, city } = req.body;
        const userId = req.user.id;

        // 📍 PRODUCTION BUSINESS LOGIC: Location Validation
        const ALLOWED_CITY = "Hyderabad";
        if (!city || city.toLowerCase() !== ALLOWED_CITY.toLowerCase()) {
            return res.status(400).json({
                message: `Service is currently only available in ${ALLOWED_CITY}.`
            });
        }

        if (!items) {
            return res.status(400).json({ message: "Missing required pickup details" });
        }

        const { data, error } = await supabase
            .from('pickups')
            .insert([
                {
                    user_id: userId, // Securely taken from middleware
                    items: items,
                    total_qty: totalQty,
                    total_weight: totalWeight,
                    alternate_number: alternateNumber,
                    time_slot: timeSlot,
                    city: city, // Store the validated city
                    status: 'scheduled',
                    amount: 0
                }
            ])
            .select();

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        res.status(201).json({
            message: "Pickup scheduled successfully",
            pickup: data[0]
        });

    } catch (error) {
        console.error("CREATE PICKUP ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   GET PICKUPS (Unified)
======================= */
exports.getPickups = async (req, res) => {
    try {
        const { id: userId, role } = req.user;

        let query = supabase.from('pickups').select('*');

        // RBAC Enforcement
        if (role === 'customer') {
            query = query.eq('user_id', userId);
        } else if (role === 'collector') {
            // Collectors see all scheduled pickups in allowed locations
            query = query.order('created_at', { ascending: false });
        } else {
            return res.status(403).json({ message: "Unauthorized role access" });
        }

        const { data, error } = await query;

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        res.json(data);

    } catch (error) {
        console.error("GET PICKUPS ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};

/* =======================
   UPDATE PICKUP STATUS (Collector)
======================= */
exports.updatePickupStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, amount } = req.body;
        const { role } = req.user;

        // Strict RBAC: Only collectors can update status
        if (role !== 'collector') {
            return res.status(403).json({ message: "Only collectors can update pickup status" });
        }

        const { data, error } = await supabase
            .from('pickups')
            .update({ status, amount })
            .eq('id', id)
            .select();

        if (error) {
            return res.status(400).json({ message: error.message });
        }

        if (!data || data.length === 0) {
            return res.status(404).json({ message: "Pickup not found" });
        }

        res.json({
            message: `Pickup status updated to ${status}`,
            pickup: data[0]
        });

    } catch (error) {
        console.error("UPDATE STATUS ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
};
