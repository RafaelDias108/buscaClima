//pegar as dados do html
document.querySelector('.busca').addEventListener('submit', async(event) => {
    //previne o comportamento padrão do form
    event.preventDefault();
    //pegar o que foi digitado
    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        clearInfo();
        showWarning("Carregando...");
        //montei a url com a API
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=8cb0f8fb49780e33ab7856e7b8c131c1&units=metric&lang=pt_br`;
        //API do curso para teste: d06cdb298fafc83c520d5ab677fc477e

        //pegar a URL
        let result = await fetch(url);

        //transformar o result em objeto json
        let json = await result.json();

        //verificar o retorno do json através do cod = 200 encontou ou 400 erro
        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning("Não foi encontrado esta localização.")
        }
    } else {
        clearInfo();
    }
});
//mostrar as dados do json
function showInfo(json) {
    showWarning("");
    document.querySelector('.resultado').classList.remove('animar');

    //passar os dados json para o html

    //Template Strings (``) são strings que permitem expressões embutidas. Você pode utilizar string multi-linhas e interpolação de string com elas.
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.resultado').classList.add('animar');

}
//função para mostrar ou remover aviso
function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
    showWarning("");

    document.querySelector('.resultado').style.display = 'none';
}