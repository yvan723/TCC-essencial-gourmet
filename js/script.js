// Script principal para o site do Buffet Elegante

document.addEventListener("DOMContentLoaded", function () {
    // Executa o código quando o DOM estiver completamente carregado

    // --- MENU MOBILE ---
    const menuToggle = document.querySelector(".menu-mobile");
    // Seleciona o botão do menu mobile
    const navMenu = document.querySelector("nav ul");
    // Seleciona o menu de navegação
    if (menuToggle) {
        // Verifica se o botão do menu mobile existe
        menuToggle.addEventListener("click", function () {
            // Adiciona um ouvinte de evento de clique ao botão
            navMenu.classList.toggle("show");
            // Alterna a classe 'show' no menu de navegação para exibir/ocultar
        });
    }

    // --- SLIDER DE DEPOIMENTOS ---
    const depoimentos = document.querySelectorAll(".depoimento");
    // Seleciona todos os elementos de depoimento
    const prevBtn = document.querySelector(".prev");
    // Seleciona o botão 'anterior'
    const nextBtn = document.querySelector(".next");
    // Seleciona o botão 'próximo'
    let currentSlide = 0;
    // Inicializa o índice do slide atual

    function showSlide(n) {
        // Função para exibir um slide específico
        depoimentos.forEach((dep, i) => {
            // Itera sobre cada depoimento
            dep.style.display = i === n ? "block" : "none";
            // Exibe o slide se o índice corresponder, caso contrário, oculta
        });
    }

    if (depoimentos.length > 0) {
        // Verifica se existem depoimentos
        showSlide(currentSlide);
        // Exibe o slide inicial
        if (prevBtn) {
            // Verifica se o botão 'anterior' existe
            prevBtn.addEventListener("click", function () {
                // Adiciona ouvinte de clique ao botão 'anterior'
                currentSlide = (currentSlide - 1 + depoimentos.length) % depoimentos.length;
                // Calcula o índice do slide anterior (com loop)
                showSlide(currentSlide);
                // Exibe o slide anterior
            });
        }
        if (nextBtn) {
            // Verifica se o botão 'próximo' existe
            nextBtn.addEventListener("click", function () {
                // Adiciona ouvinte de clique ao botão 'próximo'
                currentSlide = (currentSlide + 1) % depoimentos.length;
                // Calcula o índice do slide próximo (com loop)
                showSlide(currentSlide);
                // Exibe o slide próximo
            });
        }
    }

    // --- FORMULÁRIO DE CONTATO ---
    const contatoForm = document.getElementById("contato-form");
    // Seleciona o formulário de contato
    if (contatoForm) {
        // Verifica se o formulário de contato existe
        contatoForm.addEventListener("submit", function (e) {
            // Adiciona ouvinte de submit ao formulário
            e.preventDefault();
            // Previne o comportamento padrão de submit (recarregar a página)
            alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
            // Exibe um alerta de sucesso
            contatoForm.reset();
            // Reseta o formulário
        });
    }

    // --- FILTROS DA GALERIA ---
    const filterBtns = document.querySelectorAll(".filter-btn");
    // Seleciona todos os botões de filtro
    const galeriaItems = document.querySelectorAll(".galeria-item");
    // Seleciona todos os itens da galeria
    if (filterBtns.length > 0) {
        // Verifica se existem botões de filtro
        filterBtns.forEach(btn => {
            // Itera sobre cada botão de filtro
            btn.addEventListener("click", function () {
                // Adiciona ouvinte de clique a cada botão
                filterBtns.forEach(b => b.classList.remove("active"));
                // Remove a classe 'active' de todos os botões de filtro
                this.classList.add("active");
                // Adiciona a classe 'active' ao botão clicado
                const filter = this.getAttribute("data-filter");
                // Obtém o valor do atributo 'data-filter'
                galeriaItems.forEach(item => {
                    // Itera sobre cada item da galeria
                    item.style.display = (filter === "todos" || item.getAttribute("data-category") === filter) ? "block" : "none";
                    // Exibe ou oculta o item com base no filtro
                });
            });
        });
    }

    // --- MODAL DA GALERIA ---
    const galeriaModal = document.querySelector(".galeria-modal");
    // Seleciona o modal da galeria
    const modalImage = document.querySelector(".modal-image");
    // Seleciona a imagem dentro do modal
    const modalCaption = document.querySelector(".modal-caption");
    // Seleciona a legenda dentro do modal
    const modalClose = document.querySelector(".modal-close");
    // Seleciona o botão de fechar do modal
    const modalPrev = document.querySelector(".modal-prev");
    // Seleciona o botão 'anterior' do modal
    const modalNext = document.querySelector(".modal-next");
    // Seleciona o botão 'próximo' do modal
    let currentImage = 0;
    // Inicializa o índice da imagem atual no modal

    function updateModal() {
        // Função para atualizar o conteúdo do modal
        const item = galeriaItems[currentImage];
        // Obtém o item da galeria correspondente à imagem atual
        modalImage.src = item.querySelector("img").src;
        // Define a fonte da imagem do modal
        modalCaption.textContent = item.querySelector("h3").textContent;
        // Define a legenda do modal
    }

    if (galeriaItems.length > 0 && galeriaModal) {
        // Verifica se existem itens na galeria e o modal
        galeriaItems.forEach((item, index) => {
            // Itera sobre cada item da galeria
            item.addEventListener("click", function () {
                // Adiciona ouvinte de clique a cada item da galeria
                galeriaModal.style.display = "block";
                // Exibe o modal
                currentImage = index;
                // Define o índice da imagem atual
                updateModal();
                // Atualiza o modal
            });
        });
        if (modalClose) {
            // Verifica se o botão de fechar existe
            modalClose.addEventListener("click", function () {
                // Adiciona ouvinte de clique ao botão de fechar
                galeriaModal.style.display = "none";
                // Oculta o modal
            });
        }
        if (modalPrev && modalNext) {
            // Verifica se os botões de navegação do modal existem
            modalPrev.addEventListener("click", function () {
                // Adiciona ouvinte de clique ao botão 'anterior'
                currentImage = (currentImage - 1 + galeriaItems.length) % galeriaItems.length;
                // Calcula o índice da imagem anterior (com loop)
                updateModal();
                // Atualiza o modal
            });
            modalNext.addEventListener("click", function () {
                // Adiciona ouvinte de clique ao botão 'próximo'
                currentImage = (currentImage + 1) % galeriaItems.length;
                // Calcula o índice da imagem próxima (com loop)
                updateModal();
                // Atualiza o modal
            });
        }
    }

    // --- FORMULÁRIO DE RESERVAS MULTI-ETAPAS ---
    const formSteps = document.querySelectorAll(".form-step");
    // Seleciona todas as etapas do formulário
    const steps = document.querySelectorAll(".step");
    // Seleciona todos os indicadores de passo
    const prevFormBtn = document.querySelector(".prev-step");
    // Seleciona o botão 'anterior' do formulário
    const nextFormBtn = document.querySelector(".next-step");
    // Seleciona o botão 'próximo' do formulário
    const reservasForm = document.getElementById("reservas-form");
    // Seleciona o formulário de reservas
    let currentStep = 0;
    // Inicializa o índice da etapa atual

    // Limite dinâmico para o campo de data do evento
    const dataEventoInput = document.getElementById("data-evento");
    // Seleciona o campo de input da data do evento
    if (dataEventoInput) {
        // Verifica se o campo de data do evento existe
        const hoje = new Date();
        // Obtém a data atual
        const yyyy = hoje.getFullYear();
        // Obtém o ano atual
        const mm = String(hoje.getMonth() + 1).padStart(2, "0");
        // Obtém o mês atual (com zero à esquerda)
        const dd = String(hoje.getDate()).padStart(2, "0");
        // Obtém o dia atual (com zero à esquerda)
        const min = `${yyyy}-${mm}-${dd}`;
        // Formata a data mínima (hoje)
        const max = `${yyyy + 2}-${mm}-${dd}`;
        // Formata a data máxima (dois anos a partir de hoje)
        dataEventoInput.setAttribute("min", min);
        // Define o atributo 'min' do input de data
        dataEventoInput.setAttribute("max", max);
        // Define o atributo 'max' do input de data
    }

    function showStep(n) {
        // Função para exibir uma etapa específica do formulário
        formSteps.forEach((step, i) => step.classList.toggle("active", i === n));
        // Alterna a classe 'active' nas etapas do formulário
        steps.forEach((step, i) => step.classList.toggle("active", i === n));
        // Alterna a classe 'active' nos indicadores de passo
        prevFormBtn.style.display = n === 0 ? "none" : "block";
        // Oculta o botão 'anterior' na primeira etapa
        nextFormBtn.textContent = n === formSteps.length - 1 ? "Enviar" : "Próximo";
        // Altera o texto do botão 'próximo' para 'Enviar' na última etapa
    }

    if (formSteps.length > 0) {
        // Verifica se existem etapas no formulário
        showStep(currentStep);
        // Exibe a etapa inicial

        if (prevFormBtn) {
            // Verifica se o botão 'anterior' existe
            prevFormBtn.addEventListener("click", function () {
                // Adiciona ouvinte de clique ao botão 'anterior'
                if (currentStep > 0) {
                    // Verifica se não é a primeira etapa
                    currentStep--;
                    // Decrementa o índice da etapa
                    showStep(currentStep);
                    // Exibe a etapa anterior
                }
            });
        }

        if (nextFormBtn) {
            // Verifica se o botão 'próximo' existe
            nextFormBtn.addEventListener("click", function () {
                // Adiciona ouvinte de clique ao botão 'próximo'
                const inputs = formSteps[currentStep].querySelectorAll("input[required], select[required], textarea[required]");
                // Seleciona todos os inputs obrigatórios da etapa atual
                let isValid = true;
                // Flag de validação
                inputs.forEach(input => {
                    // Itera sobre cada input obrigatório
                    if (!input.value) {
                        // Verifica se o input está vazio
                        isValid = false;
                        // Define a flag de validação como falsa
                        input.classList.add("invalid");
                        // Adiciona a classe 'invalid' ao input
                    } else {
                        input.classList.remove("invalid");
                        // Remove a classe 'invalid' do input
                    }
                });

                                // Validação extra para o campo de data do evento
                // Esta seção é executada quando o usuário tenta avançar para a próxima etapa do formulário
                // e a etapa atual é a de detalhes do evento (currentStep === 1).
                if (currentStep === 1) { // Verifica se estamos na etapa de detalhes do evento
                    const dataEvento = document.getElementById("data-evento");
                    // Obtém a referência ao elemento input com o ID "data-evento".
                    // Este é o campo onde o usuário seleciona a data do evento.
                    if (dataEvento) {
                        // Verifica se o elemento dataEvento foi encontrado no DOM para evitar erros.
                        const min = dataEvento.getAttribute("min");
                        // Recupera o valor mínimo permitido para a data, definido no atributo 'min' do HTML.
                        // Este valor é uma string no formato 'YYYY-MM-DD'.
                        const max = dataEvento.getAttribute("max");
                        // Recupera o valor máximo permitido para a data, definido no atributo 'max' do HTML.
                        // Este valor também é uma string no formato 'YYYY-MM-DD'.

                        // Converte as datas para objetos Date para comparação
                        // É crucial converter as strings de data para objetos Date para que as comparações (>, <) funcionem corretamente.
                        const selectedDate = new Date(dataEvento.value);
                        // Cria um objeto Date a partir do valor selecionado pelo usuário no campo.
                        const minDate = new Date(min);
                        // Cria um objeto Date a partir da data mínima permitida.
                        const maxDate = new Date(max);
                        // Cria um objeto Date a partir da data máxima permitida.

                        // Verifica se a data selecionada está fora do intervalo
                        // Compara a data selecionada com as datas mínima e máxima.
                        if (selectedDate < minDate || selectedDate > maxDate) {
                            // Se a data selecionada for anterior à data mínima OU posterior à data máxima, a validação falha.
                            isValid = false;
                            // Define a flag 'isValid' como false, indicando que há um erro no formulário.
                            dataEvento.classList.add("invalid");
                            // Adiciona a classe CSS "invalid" ao campo de data.
                            // Esta classe pode ser usada para aplicar estilos visuais (ex: borda vermelha) ao campo inválido.
                            // Define uma mensagem de validação personalizada para o input.
                            // setCustomValidity é um método HTML5 que permite definir uma mensagem de erro personalizada para o campo.
                            // Esta mensagem será exibida pelo navegador quando o campo for considerado inválido.
                            dataEvento.setCustomValidity(`Por favor, escolha uma data entre ${min.split("-").reverse().join("/")} e ${max.split("-").reverse().join("/")}.`);
                            // A mensagem é formatada para ser mais amigável, convertendo as datas de 'YYYY-MM-DD' para 'DD/MM/YYYY'.
                        } else {
                            // Se a data selecionada estiver dentro do intervalo válido.
                            dataEvento.classList.remove("invalid");
                            // Remove a classe "invalid" do campo, caso ela tenha sido adicionada anteriormente.
                            dataEvento.setCustomValidity(""); // Limpa a mensagem de erro
                            // Limpa qualquer mensagem de erro personalizada que possa ter sido definida anteriormente.
                            // Isso é importante para que o campo seja considerado válido após a correção do usuário.
                        }
                    }
                }

                // Validação extra para o checkbox dos termos na última etapa
                // Esta validação é específica para a última etapa do formulário de reservas.
                if (currentStep === formSteps.length - 1) {
                    // Verifica se a etapa atual é a última etapa do formulário.
                    const termos = reservasForm.querySelector("input[name=\'termos\']");
                    // Seleciona o checkbox com o atributo 'name' igual a "termos" dentro do formulário de reservas.
                    if (!termos.checked) {
                        // Verifica se o checkbox 'termos' NÃO está marcado (checked é false).
                        isValid = false;
                        // Define a flag 'isValid' como false, pois o termo não foi aceito.
                        termos.classList.add("invalid");
                        // Adiciona a classe CSS "invalid" ao checkbox para feedback visual.
                        // Define uma mensagem de validação personalizada para o checkbox.
                        termos.setCustomValidity("Você deve aceitar os termos de uso e política de privacidade para enviar o formulário.");
                        // Define a mensagem de erro que será exibida se o checkbox não estiver marcado.
                    } else {
                        // Se o checkbox 'termos' estiver marcado.
                        termos.classList.remove("invalid");
                        // Remove a classe "invalid" do checkbox.
                        termos.setCustomValidity(""); // Limpa a mensagem de erro
                        // Limpa qualquer mensagem de erro personalizada.
                    }
                }

                // Se a validação falhar, exibe um alerta geral e impede o avanço
                // Esta é uma verificação final após todas as validações específicas da etapa.
                if (!isValid) {
                    // Se a flag 'isValid' for false (indicando que um ou mais campos estão inválidos).
                    alert("Por favor, preencha todos os campos obrigatórios e corrija os erros.");
                    // Exibe um alerta genérico informando ao usuário para corrigir os erros.
                    // Nota: Embora setCustomValidity forneça feedback inline, este alerta serve como um resumo.
                    return;
                    // Interrompe a execução da função, impedindo o avanço para a próxima etapa ou o envio do formulário.
                }
                
                // Se for a última etapa e a validação for bem-sucedida
                // Esta seção é executada apenas se todas as validações da etapa atual passaram.
                if (currentStep === formSteps.length - 1) {
                    // Verifica se a etapa atual é a última etapa do formulário.
                    if (reservasForm) {
                        // Verifica se o formulário de reservas existe.
                        const sucessoMsg = document.createElement("div");
                        // Cria um novo elemento HTML <div> para exibir a mensagem de sucesso.
                        sucessoMsg.className = "mensagem-sucesso";
                        // Adiciona a classe CSS "mensagem-sucesso" ao novo <div> para estilização.
                        sucessoMsg.innerHTML = `
                            <h3>Reserva enviada com sucesso!</h3>
                            <p>Obrigado por reservar conosco. Em breve nossa equipe entrará em contato para confirmar os detalhes do seu evento.</p>
                        `;
                        // Define o conteúdo HTML interno da mensagem de sucesso, incluindo um título e um parágrafo.
                        reservasForm.parentNode.insertBefore(sucessoMsg, reservasForm);
                        // Insere a mensagem de sucesso (sucessoMsg) no DOM, antes do formulário de reservas.
                        // parentNode.insertBefore() é usado para adicionar um elemento como irmão de outro.
                        reservasForm.style.display = "none";
                        // Oculta o formulário de reservas após o envio bem-sucedido.
                        setTimeout(() => {
                            // Inicia um temporizador que executará uma função após 6 segundos (6000 milissegundos).
                            sucessoMsg.remove();
                            // Remove a mensagem de sucesso do DOM após o tempo limite.
                            reservasForm.reset();
                            // Reseta todos os campos do formulário para seus valores iniciais.
                            reservasForm.style.display = "block";
                            // Torna o formulário visível novamente.
                            currentStep = 0;
                            // Redefine a etapa atual para a primeira etapa do formulário.
                            showStep(currentStep);
                            // Exibe a primeira etapa do formulário, preparando-o para um novo preenchimento.
                        }, 6000);
                        // Tempo de espera de 6 segundos antes de resetar o formulário e ocultar a mensagem.
                    }
                } else {
                    // Se não for a última etapa e a validação for bem-sucedida, avança para a próxima etapa.
                    currentStep++;
                    // Incrementa o índice da etapa atual.
                    showStep(currentStep);
                    // Exibe a próxima etapa do formulário.
                }
            });
        }
    }

    // --- FILTROS DO MENU ---
    // Esta seção lida com a funcionalidade de filtragem de categorias no menu.
    const categoryBtns = document.querySelectorAll(".category-btn");
    // Seleciona todos os botões que servem como filtros de categoria (ex: "Todos", "Pratos Principais").
    const menuCategories = document.querySelectorAll(".menu-category");
    // Seleciona todos os contêineres de categoria de menu (ex: seção de "Entradas", "Bebidas").
    if (categoryBtns.length > 0) {
        // Verifica se existem botões de categoria para evitar erros.
        categoryBtns.forEach(btn => {
            // Itera sobre cada botão de categoria encontrado.
            btn.addEventListener("click", function () {
                // Adiciona um ouvinte de evento de clique a cada botão de categoria.
                categoryBtns.forEach(b => b.classList.remove("active"));
                // Remove a classe "active" de TODOS os botões de categoria.
                // Isso garante que apenas um botão de filtro esteja ativo por vez.
                this.classList.add("active");
                // Adiciona a classe "active" ao botão que foi clicado.
                // Isso pode ser usado para estilizar o botão ativo (ex: mudar cor de fundo).
                const filter = this.getAttribute("data-filter");
                // Obtém o valor do atributo 'data-filter' do botão clicado.
                // Este valor (ex: "todos", "pratos-principais") é usado para determinar qual categoria exibir.
                menuCategories.forEach(category => {
                    // Itera sobre cada contêiner de categoria de menu.
                    category.style.display = (filter === "todos" || category.getAttribute("data-category") === filter) ? "block" : "none";
                    // Define a propriedade 'display' de cada categoria:
                    // - Se o filtro for "todos", ou se o 'data-category' da categoria corresponder ao filtro,
                    //   a categoria é exibida (display: "block").
                    // - Caso contrário, a categoria é ocultada (display: "none").
                });
            });
        });
    }
});
