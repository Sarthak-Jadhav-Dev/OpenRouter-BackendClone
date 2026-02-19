const supabase = require('../model/supabaseClient');

module.exports = async (req, res, next) => {
    try {
        const user = req.headers['user'];
        if (!user) {
            return res.status(401).json({ message: "User is missing" });
        }
        const { data: userData, error: userError } = await supabase.from('Users').select('*').eq('User_name', user).single();
        if (userError || !userData) {
            console.log({ userError, userData, user });
            return res.status(401).json({ message: "User is Not Valid", error: userError?.message });
        }
        next();
    } catch (err) {
        return res.status(500).json({ message: "Authentication error" });
    }
};