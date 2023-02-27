const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


module.exports.predictMatchUniversity = async function(profileData) {
    let finalPrompt = formatPrompt(profileData);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: finalPrompt,
        temperature: 0,
        max_tokens: 600,
    });
    let formated = formatResponse(response["data"]["choices"][0]["text"])
    return formated
}

function formatResponse(response) {
    response = response.replace(/\./g, "")
    response = response.replace("%", "")
    return JSON.parse(response)
}

function formatPrompt(profileData) {

    let text_prompt = `Recomende duas universidades para essa pessoa com base no texto abaixo. As universidades podem ser públicas ou privadas. Na resposta, retorne apenas um objeto JSON válido. Não coloque nenhum caractere nem espaços em branco além do JSON. O formato do JSON é:
    {"nome da universidade 1": "motivo de escolha", "nome da universidade 2": motivo de escolha"}\nO motivo de escolha deve ser bem detalhado. Nunca repita os motivos de escolha. Destaque as qualidades de cada universidade acerca dos interesses e áreas de pesquisa apresentados no texto.\n Texto: '
    `
    if(profileData["faculdade"]) {
        text_prompt += `Faço faculdade de ${profileData["faculdade"]}.\n`
    }
    text_prompt += `Meus principais interesses de estudo são ${profileData["interesses"]}.\n`;

    text_prompt += `Realizo pesquisas acerca dos temas: ${profileData["área de pesquisa"]}\n`;

    text_prompt += `Desejo fazer um programa de ${profileData["curso"]} na universidade que for recomendada.\n`;

    if(profileData["realocação"]) {
        text_prompt += `Hoje moro no estado ${profileData["estado"]} e tenho possibilidade de realocação. Meu orçamento mensal é de ${profileData["orcamento"]} reais`;
    }
    else { 
        text_prompt += `Hoje moro no estado ${profileData["estado"]} e não tenho possibilidade de realocação. Meu orçamento mensal é de ${profileData["orcamento"]} reais.'`;
    }
    return text_prompt;
}
