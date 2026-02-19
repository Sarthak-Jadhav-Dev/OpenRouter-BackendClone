const generateKeyService = require('../services/generateKey.services');
const supabase = require('../model/supabaseClient');

exports.addKey = async (req, res, next) => {
    const newKey = generateKeyService.generateKey();

    if(newKey) {
        console.log(`Generated API Key: ${newKey}`);
        const { data, error } = await supabase
            .from('API_Keys')
            .insert({ API_key: newKey , User_name: req.headers['user'] })
            .select();
        if(error){
            console.log('Supabase Insert Error:', error);
            res.status(500).json({ error: 'Failed to save API key', details: error.message });
        }else{
            res.status(200).json({ key: newKey });
        }
    }else{
        console.log('Supabase Insert Error:', error);
        res.status(500).json({ error: 'Failed to save API key', details: error.message });
    }
}
exports.listKeys = async (req, res, next) => {
    const { data, error } = await supabase
        .from('API_Keys')
        .select('API_key')
        .eq('User_name', req.headers['user']);
    if(error){
        res.status(500).json({ error: 'Failed to retrieve API keys' ,details:error.messege});
    }else{
        res.status(200).json({ keys: data });
    }
}
exports.deleteKey = async(req,res,next)=>{
    const { key } = req.body;
    const { data, error } = await supabase
        .from('API_Keys')
        .delete()
        .eq('API_key', key)
        .eq('User_name', req.headers['user']);
    if(error){
        res.status(500).json({ error: 'Failed to delete API key' });
    }else{
        res.status(200).json({messege: 'API key deleted successfully' });
    }
}