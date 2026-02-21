const supabase = require('../model/supabaseClient');

exports.getFinalPrice = async ({ username }) => {
    try {
        const { data: apiKeys, error: keyError } = await supabase
            .from("API_Keys")
            .select("API_key")
            .eq("User_name", username);

        if (keyError) throw keyError;

        if (!apiKeys || apiKeys.length === 0) {
            return {
                username,
                total_input_tokens: 0,
                total_output_tokens: 0,
                total_tokens: 0,
                total_price: 0,
            };
        }

        const keys = apiKeys.map((k) => k.API_key);
        const { data: usage, error: usageError } = await supabase
            .from("api_usage")
            .select("input_tokens, output_tokens, total_tokens, price")
            .in("api_key", keys);

        if (usageError) throw usageError;

        const totals = usage.reduce(
            (acc, row) => {
                acc.total_input_tokens += Number(row.input_tokens || 0);
                acc.total_output_tokens += Number(row.output_tokens || 0);
                acc.total_tokens += Number(row.total_tokens || 0);
                acc.total_price += Number(row.price || 0);
                return acc;
            },
            {
                total_input_tokens: 0,
                total_output_tokens: 0,
                total_tokens: 0,
                total_price: 0,
            }
        );
        const commission = totals.base_price * 0.05;
        const finalPrice = totals.base_price + commission;

        return {
            username,
            total_input_tokens: totals.total_input_tokens,
            total_output_tokens: totals.total_output_tokens,
            total_tokens: totals.total_tokens,
            base_price: Number(totals.base_price.toFixed(6)),
            commission_5_percent: Number(commission.toFixed(6)),
            final_price: Number(finalPrice.toFixed(6)),
        };
    } catch (error) {
        console.error("Error calculating the Bill , Try Again", error);
        throw error;
    }
}