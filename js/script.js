// Script principal para o site do Buffet Elegante

document.addEventListener('DOMContentLoaded', function () {
    // --- MENU MOBILE ---
    const menuToggle = document.querySelector('.menu-mobile');
    const navMenu = document.querySelector('nav ul');
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('show');
        });
    }

    // --- SLIDER DE DEPOIMENTOS ---
    const depoimentos = document.querySelectorAll('.depoimento');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(n) {
        depoimentos.forEach((dep, i) => {
            dep.style.display = i === n ? 'block' : 'none';
        });
    }

    if (depoimentos.length > 0) {
        showSlide(currentSlide);
        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                currentSlide = (currentSlide - 1 + depoimentos.length) % depoimentos.length;
                showSlide(currentSlide);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                currentSlide = (currentSlide + 1) % depoimentos.length;
                showSlide(currentSlide);
            });
        }
    }

    // --- FORMULÁRIO DE CONTATO ---
    const contatoForm = document.getElementById('contato-form');
    if (contatoForm) {
        contatoForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contatoForm.reset();
        });
    }

    // --- FILTROS DA GALERIA ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galeriaItems = document.querySelectorAll('.galeria-item');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');
                galeriaItems.forEach(item => {
                    item.style.display = (filter === 'todos' || item.getAttribute('data-category') === filter) ? 'block' : 'none';
                });
            });
        });
    }

    // --- MODAL DA GALERIA ---
    const galeriaModal = document.querySelector('.galeria-modal');
    const modalImage = document.querySelector('.modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    let currentImage = 0;

    function updateModal() {
        const item = galeriaItems[currentImage];
        modalImage.src = item.querySelector('img').src;
        modalCaption.textContent = item.querySelector('h3').textContent;
    }

    if (galeriaItems.length > 0 && galeriaModal) {
        galeriaItems.forEach((item, index) => {
            item.addEventListener('click', function () {
                galeriaModal.style.display = 'block';
                currentImage = index;
                updateModal();
            });
        });
        if (modalClose) {
            modalClose.addEventListener('click', function () {
                galeriaModal.style.display = 'none';
            });
        }
        if (modalPrev && modalNext) {
            modalPrev.addEventListener('click', function () {
                currentImage = (currentImage - 1 + galeriaItems.length) % galeriaItems.length;
                updateModal();
            });
            modalNext.addEventListener('click', function () {
                currentImage = (currentImage + 1) % galeriaItems.length;
                updateModal();
            });
        }
    }

    // --- FORMULÁRIO DE RESERVAS MULTI-ETAPAS ---
    const formSteps = document.querySelectorAll('.form-step');
    const steps = document.querySelectorAll('.step');
    const prevFormBtn = document.querySelector('.prev-step');
    const nextFormBtn = document.querySelector('.next-step');
    const reservasForm = document.getElementById('reservas-form');
    let currentStep = 0;

    // Limite dinâmico para o campo de data do evento
    const dataEventoInput = document.getElementById('data-evento');
    if (dataEventoInput) {
        const hoje = new Date();
        const yyyy = hoje.getFullYear();
        const mm = String(hoje.getMonth() + 1).padStart(2, '0');
        const dd = String(hoje.getDate()).padStart(2, '0');
        const min = `${yyyy}-${mm}-${dd}`;
        const max = `${yyyy + 2}-${mm}-${dd}`;
        dataEventoInput.setAttribute('min', min);
        dataEventoInput.setAttribute('max', max);
    }

    function showStep(n) {
        formSteps.forEach((step, i) => step.classList.toggle('active', i === n));
        steps.forEach((step, i) => step.classList.toggle('active', i === n));
        prevFormBtn.style.display = n === 0 ? 'none' : 'block';
        nextFormBtn.textContent = n === formSteps.length - 1 ? 'Enviar' : 'Próximo';
    }

    if (formSteps.length > 0) {
        showStep(currentStep);

        if (prevFormBtn) {
            prevFormBtn.addEventListener('click', function () {
                if (currentStep > 0) {
                    currentStep--;
                    showStep(currentStep);
                }
            });
        }

        

        if (nextFormBtn) {
            nextFormBtn.addEventListener('click', function () {
                const inputs = formSteps[currentStep].querySelectorAll('input[required], select[required], textarea[required]');
                let isValid = true;
                inputs.forEach(input => {
                    if (!input.value) {
                        isValid = false;
                        input.classList.add('invalid');
                    } else {
                        input.classList.remove('invalid');
                    }
                });

                // Validação extra para o campo de data do evento
                if (currentStep === 1) { // etapa de detalhes do evento
                    const dataEvento = document.getElementById('data-evento');
                    if (dataEvento) {
                        const min = dataEvento.getAttribute('min');
                        const max = dataEvento.getAttribute('max');
                        if (dataEvento.value < min || dataEvento.value > max) {
                            isValid = false;
                            dataEvento.classList.add('invalid');
                            alert('Por favor, escolha uma data do evento a partir de hoje (' + min.split('-').reverse().join('/') + ') até ' + max.split('-').reverse().join('/'));
                            return;
                        } else {
                            dataEvento.classList.remove('invalid');
                        }
                    }
                }

                // Validação extra para o checkbox dos termos na última etapa
                if (currentStep === formSteps.length - 1) {
                    const termos = reservasForm.querySelector('input[name="termos"]');
                    if (!termos.checked) {
                        isValid = false;
                        termos.classList.add('invalid');
                        alert('Você deve aceitar os termos de uso e política de privacidade para enviar o formulário.');
                        return;
                    } else {
                        termos.classList.remove('invalid');
                    }
                }

                if (!isValid) {
                    alert('Por favor, preencha todos os campos obrigatórios.');
                    return;
                }
                if (currentStep === formSteps.length - 1) {
                    if (reservasForm) {
                        const sucessoMsg = document.createElement('div');
                        sucessoMsg.className = 'mensagem-sucesso';
                        sucessoMsg.innerHTML = `
                            <h3>Reserva enviada com sucesso!</h3>
                            <p>Obrigado por reservar conosco. Em breve nossa equipe entrará em contato para confirmar os detalhes do seu evento.</p>
                        `;
                        reservasForm.parentNode.insertBefore(sucessoMsg, reservasForm);
                        reservasForm.style.display = 'none';
                        setTimeout(() => {
                            sucessoMsg.remove();
                            reservasForm.reset();
                            reservasForm.style.display = 'block';
                            currentStep = 0;
                            showStep(currentStep);
                        }, 6000);
                    }
                } else {
                    currentStep++;
                    showStep(currentStep);
                }
            });
        }
    }

    // --- FILTROS DO MENU ---
    const categoryBtns = document.querySelectorAll('.category-btn');
    const menuCategories = document.querySelectorAll('.menu-category');
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');
                menuCategories.forEach(category => {
                    category.style.display = (filter === 'todos' || category.getAttribute('data-category') === filter) ? 'block' : 'none';
                });
            });
        });
    }
});