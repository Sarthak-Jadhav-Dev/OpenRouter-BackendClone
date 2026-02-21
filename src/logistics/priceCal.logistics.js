
const supabase = require("../model/supabaseClient");

exports.calulatePrice = async({API_key,providerName,model_name,InputTokens,OutputTokens,totalTokens},next)=>{
    if(!totalTokens){
        totalTokens = InputTokens+OutputTokens;
    }
    try{
        let price = 0;

        const {data: priceData, error: priceError} = await supabase
            .from('pricing')
            .select('price_per_token')
            .eq('provider', providerName)
            .eq('model', model_name)
            .single();
        
        if(!priceError && priceData){
            price = priceData.price_per_token * totalTokens;
            console.log(`Price calculated: ${price}`);
        } else {
            console.warn(`No pricing found for ${providerName}/${model_name}, logging usage without price`);
        }
        
        try{
            const {data, error} = await supabase
                .from('api_usage')
                .insert({
                    api_key: API_key,
                    provider: providerName,
                    model: model_name,
                    input_tokens: InputTokens,
                    output_tokens: OutputTokens,
                    total_tokens: totalTokens,
                    price: price || null
                });
                if(error){
                    throw new Error(`Error logging usage: ${error.message}`);
                }else{
                    console.log("Logged API Usage successfully!");
                }
        }catch(error){
            console.error(`Error logging usage: ${error.message}`);
            if(next) next(error);
        }
    }catch(error){
        console.error(`Error in calulatePrice: ${error.message}`);
        if(next) next(error);
    }
}