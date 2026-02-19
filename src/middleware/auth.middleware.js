const supabase = require('../model/supabaseClient');

module.exports = async (req, res, next) => {
  try {
    const apiKey = req.headers['api-key'];
    const user = req.headers['user'];

    if(!user){
      return res.status(401).json({ message: "User is missing" });
    }
    if(!apiKey){
      return res.status(401).json({ message: "API Key is missing" });
    }

    const { data: userData, error: userError } = await supabase.from('Users').select('*').eq('User_name', user).single();

    if (userError || !userData) {
      console.log({ userError, userData, user });
      return res.status(401).json({ message: "User is Not Valid", error: userError?.message });
    }

    const { data: apiKeyData, error: keyError } = await supabase.from('API_Keys').select('*').eq('API_key', apiKey).single();

    if (keyError || !apiKeyData) {
      console.log({ keyError, apiKeyData, apiKey });
      return res.status(401).json({ message: "API Key is Not Valid", error: keyError?.message });
    }
    req.user = userData.user_id;

    next();
  } catch (err) {
    return res.status(500).json({ message: "Authentication error" });
  }
};