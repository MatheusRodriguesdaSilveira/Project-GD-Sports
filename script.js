let roupasJson = [
    {id:1, name:'Camiseta Nike Brasil 2023/24', img:'./assets/0272140L.avif', price:300.00 , sizes:['P', 'M', 'G'], description:'Futebol'},
    {id:2, name:'Camiseta Barcelona 2023/24', img:'./assets/barca.avif', price:300.00 , sizes:['P', 'M', 'G'], description:'Futebol'},
    {id:3, name:'Camiseta Paris Saint Germain 2023/24', img:'./assets/paris.avif', price:300.00 , sizes:['P', 'M', 'G'], description:'Futebol'},
    {id:4, name:'Camiseta Corinthians 2021/22', img:'./assets/corinthians.avif', price:300.00 , sizes:['P', 'M', 'G'], description:'Futebol'},
];  

let modalQt = 1;
let modalKey = 0;

const c =(el)=>document.querySelector(el);
const cs =(el)=>document.querySelectorAll(el);

const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartCounter = document.getElementById("cart-count");
const cartCloser = document.getElementById("btn-closer");
const addressInput = document.getElementById("address");
const addressBtn = document.getElementById("btn-address");
const addressWarn = document.getElementById("address-warn");
const cartFinish = document.getElementById("btn-finalizar");

let cart = [];
// Listagem das Roupas
roupasJson.map((item, index)=>{
    let roupaItem = c('.models .roupa-item').cloneNode(true);

    roupaItem.setAttribute('data-key', index);
    roupaItem.querySelector('.roupa-item--img img').src = item.img;  
    roupaItem.querySelector('.roupa-item--name').innerHTML = item.name;
    roupaItem.querySelector('.roupa-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    
    roupaItem.querySelector('a').addEventListener('click', (event)=>{
        event.preventDefault();
        let key = event.target.closest('.roupa-item').getAttribute('data-key');
        modalQt = 1;
        modalKey = key;

        c('.roupaInfo h1').innerHTML = roupasJson[key].name;     
        c('.roupaBig img').src = roupasJson[key].img;
        c('.roupaInfo--actualPrice').innerHTML = `R$ ${roupasJson[key].price.toFixed(2)}`;
        c('.roupaInfo--desc').innerHTML = roupasJson[key].description;

        c('.roupaInfo--size.selected').classList.remove('selected');

        cs('.roupaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = roupasJson[key].sizes[sizeIndex];
        }); 

        c('.roupaInfo--qt').innerHTML = modalQt;

        c('.roupaWindowArea').style.opacity = 0;
        c('.roupaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            c('.roupaWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.roupa-area').append( roupaItem );
});

// Eventos do MODAL

// Fechar o modal pelo computador clicalndo em 'cancelar'
function closeModal() {
    c('.roupaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.roupaWindowArea').style.display = "none";
    }, 500);
};

cs('.roupaInfo--cancelButton, .roupaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
})

// Fechar o modal pelo computador clicando fora da tela
c('.roupaWindowArea').addEventListener("click", function(event){
    if(event.target === c('.roupaWindowArea')){
        c('.roupaWindowArea').style.opacity = 0;
        setTimeout(()=>{
            c('.roupaWindowArea').style.display = "none";
        }, 500);
    }
});

// Contagem de roupas
c('.roupaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.roupaInfo--qt').innerHTML = modalQt;
    
});

c('.roupaInfo--qtmenos').addEventListener('click', ()=>{
if(modalQt > 1){
    modalQt--;
    c('.roupaInfo--qt').innerHTML = modalQt;
}
});

cs('.roupaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (event)=>{
        c('.roupaInfo--size.selected').classList.remove('selected');
        event.target.classList.add('selected');
    });
}); 


// Adcionar ao Modal carrinho
c('.roupaInfo--addButton').addEventListener('click', () =>{
    let size = parseInt(c('.roupaInfo--size.selected').getAttribute('data-key'));
    let identifier = roupasJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=>item.identifier == identifier);

    if(key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id:roupasJson[modalKey].id,
            size,
            qt:modalQt,
        });
    }
    closeModal();
    updateCart();
});

// Tela Modal Carrinho
function updateCart() {
    addressInput.addEventListener('input', function(event){
        let inputValeu = event.target.value;
        
        if(inputValeu !== ''){
            addressInput.classList.remove("border-red-500")
            addressWarn.classList.add('hidden')
        
        }
})

    if(cart.length > 0) {
        c('aside').classList.add('fullscreen-aside');
        c('aside').classList.add('show');
        c('.main-content').classList.add('shift-left');
        c('.cart').innerHTML = '';
                                
        let subtotal = 0;
        let desconto = 0;    
        let total = 0;    
        

        for(let i in cart){
            let roupaItem = roupasJson.find((item)=>item.id == cart[i].id);
            subtotal += roupaItem.price * cart[i].qt;

            let cartItem = c('.models .cart--item').cloneNode(true);

            let roupaSizeName;
            switch(cart[i].size){
                case 0:
                roupaSizeName = 'P';
                break;

                case 1:
                roupaSizeName = 'M';
                break;

                case 2:
                roupaSizeName = 'G';
                break;
            }

            let roupaName = `${roupaItem.name} (${roupaSizeName})`;

            cartItem.querySelector('img').src = roupaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = roupaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;  
                updateCart();
            });
            
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
            if(cart[i].qt > 1){
                cart[i].qt--;

            } else {
                cart.splice(i, 1);
            }
                updateCart();
            }); 

            c('.cart').append(cartItem);
        }
            desconto = subtotal * 0.1;
            total = subtotal - desconto;    

            document.getElementById('sub').innerHTML = `R$ ${subtotal.toFixed(2)}`;
            document.getElementById('desc').innerHTML = `R$ ${desconto.toFixed(2)}`;
            document.getElementById('total').innerHTML = `R$ ${total.toFixed(2)}`;

    } else{
        c('aside').classList.remove('show')
        c('aside').classList.remove('fullscreen-aside');
        c('.main-content').classList.remove('shift-left'); // Remove a classe para restaurar a posição
    };
    cartCounter.innerText = cart.length;
    
};

// Evento para fechar o carrinho
cartCloser.addEventListener('click', () => {
    c('aside').classList.remove('show');
    c('.main-content').classList.remove('shift-left');
    c('aside').classList.remove('fullscreen-aside');

});

cartCloser.addEventListener("click", function(event){
    if(event.target === cartCloser){
        c('aside').classList.remove('show');
        c('.main-content').classList.remove('shift-left');
    }
});
updateCart();
// Evento para abrir o carrinho
cartBtn.addEventListener('click', () => {
    if (window.innerWidth <= 768) { // Resposive Celular
        c('aside').classList.add('fullscreen-aside');
    } else {
        c('aside').classList.remove('fullscreen-aside');
    }
    
    c('aside').classList.add('show');
    c('.main-content').classList.add('shift-left');
    updateCart();
});

// Evento para buscar e exibir o endereço pelo CEP
let enderecoFormatado = '';

addressBtn.addEventListener('click', function() {
    const cep = addressInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos do CEP
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cep.length !== 8) {
        alert('CEP inválido!');
        return;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado!');
                return;
            }

            // String formatada com os dados
            enderecoFormatado = `
                Rua: ${data.logradouro} <br>
                Bairro: ${data.bairro} <br>
                Cidade: ${data.localidade} <br>
                Estado: ${data.uf}
             `.replace(/\n\s+/g, '\n');

            // Preenche o elemento #endereco com a string formatada
            document.getElementById('endereco').innerHTML = enderecoFormatado;

            // Exibe o elemento #endereco
            document.getElementById('endereco').classList.remove('hidden');
        })
        .catch(error => {
            alert('Erro ao buscar o endereço!');
            console.error('Erro:', error);
        });
});


// Mandar o pedido para o WhatsAppgit remote add origin https://github.com/MatheusRodriguesdaSilveira/GD-Sports.git
cartFinish.addEventListener('click', () => {
    if(cart.length === 0) return;
    if(addressInput.value === ''){
        addressWarn.classList.remove('hidden')
        addressInput.classList.add("border-red-500")
        return;
    }

    const enderecoParaMensagem = enderecoFormatado.replace(/<br>/g, ' | ');
    let mensagem = 'Olá, gostaria de fazer o seguinte pedido:\n\n';
    cart.forEach(item => {
        const roupaItem = roupasJson.find(roupa => roupa.id === item.id);
        const tamanho = ['P', 'M', 'G'][item.size];
        mensagem += `- ${roupaItem.name} (${tamanho}): ${item.qt} unidade(s)\n`;
    });
    mensagem += `\nTotal: ${document.getElementById('total').innerText}\n`;
    mensagem += `\nEndereço de Entrega:\n${enderecoParaMensagem}`;

    const numeroTelefone = '5511910346829'; 
    const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroTelefone}&text=${encodeURIComponent(mensagem)}`;

    window.open(urlWhatsApp);
});
