class StudyManager {
    constructor(database, delimiter = ' > ') {
        this.database = database;
        this.categoryList = document.getElementById('categoryList');
        this.currentCategoryTitle = document.getElementById('currentCategoryTitle');
        this.itemList = document.getElementById('itemList');
        this.delimiter = delimiter;
        this.estudoData = this.convertStudyData(database);
        this.initialize();
    }

    getProgressColor(progress) {
        const red = 255 * (1 - progress / 100);
        const green = 255 * (progress / 100);
        return `rgb(${red}, ${green}, 0)`;
    }

    convertStudyData(arrayDeTarefas) {
        const categoriasAgrupadas = {};
        const novoEstudoData = [];
        arrayDeTarefas.forEach(item => {
            const partesTarefa = item.tarefa.split(this.delimiter);
            const tarefaPrincipal = partesTarefa[0].trim();
            const subTarefas = partesTarefa.slice(1).map(p => p.trim());
            const categoria = item.categoria.trim();
            if (!categoriasAgrupadas[categoria]) {
                categoriasAgrupadas[categoria] = { titulo: categoria, itens: [] };
            }
            const categoriaItens = categoriasAgrupadas[categoria].itens;
            let itemPai = categoriaItens.find(it => it.texto === tarefaPrincipal);
            if (subTarefas.length > 0) {
                if (!itemPai) {
                    itemPai = { texto: tarefaPrincipal, concluida: parseInt(item.concluida, 10) || 0, subItens: [] };
                    categoriaItens.push(itemPai);
                }
                let nivelAtual = itemPai.subItens;
                subTarefas.forEach((subTarefa) => {
                    let subItemExistente = nivelAtual.find(it => it.texto === subTarefa);
                    if (!subItemExistente) {
                        const novoSubItem = { texto: subTarefa, concluida: parseInt(item.concluida, 10) || 0, subItens: [] };
                        nivelAtual.push(novoSubItem);
                        subItemExistente = novoSubItem;
                    }
                    nivelAtual = subItemExistente.subItens;
                });
            } else if (!categoriaItens.find(it => it.texto === tarefaPrincipal)) {
                categoriaItens.push({ texto: tarefaPrincipal, concluida: parseInt(item.concluida, 10) || 0, subItens: [] });
            }
        });
        for (const categoria in categoriasAgrupadas) {
            let totalItens = 0;
            let progressoTotal = 0;
                const calcularProgresso = (itens) => {
                itens.forEach(item => {
                    if (item.subItens?.length > 0) {
                        let subItensTotal = 0;
                        let subItensProgresso = 0;
                        const calcularSubItens = (subItens) => {
                            subItens.forEach(subItem => {
                                if (subItem.subItens?.length > 0) {
                                    // Calcula progresso dos subitens recursivamente primeiro
                                    let subSubTotal = 0;
                                    let subSubProgresso = 0;
                                    calcularSubItens(subItem.subItens);
                                    subItem.subItens.forEach(subSubItem => {
                                        subSubTotal++;
                                        subSubProgresso += subSubItem.concluida;
                                    });
                                    subItem.concluida = subSubTotal > 0 ? subSubProgresso / subSubTotal : 0;
                                }
                                subItensTotal++;
                                subItensProgresso += subItem.concluida;
                            });
                        };
                        calcularSubItens(item.subItens);
                        item.concluida = subItensTotal > 0 ? subItensProgresso / subItensTotal : 0;
                        totalItens++;
                        progressoTotal += item.concluida;
                    } else {
                        totalItens++;
                        progressoTotal += item.concluida;
                    }
                });
            };
            calcularProgresso(categoriasAgrupadas[categoria].itens);
            categoriasAgrupadas[categoria].progressoCategoria = totalItens > 0 ? (progressoTotal / totalItens) : 0;
            novoEstudoData.push(categoriasAgrupadas[categoria]);
        }
        return novoEstudoData;
    }

    displayCategories() {
        this.categoryList.innerHTML = '';
        this.estudoData.forEach(categoria => {
            const categoryItem = document.createElement('li');
            categoryItem.classList.add('has-children', 'collapsed');
            const arrowSpan = document.createElement('span');
            arrowSpan.classList.add('arrow');
            categoryItem.prepend(arrowSpan);
            const categoryProgress = categoria.progressoCategoria || 0;
            const categoryTextSpan = document.createElement('span');
            categoryTextSpan.innerHTML = `
                ${categoria.titulo}
                <div class="category-progress-container">
                    <div class="progress-bar"><div class="progress-fill" style="width: ${categoryProgress}%; background-color: ${this.getProgressColor(categoryProgress)}"></div></div>
                    <span class="progress-text">${Math.round(categoryProgress).toFixed(2)}%</span>
                </div>
            `;
            categoryItem.appendChild(categoryTextSpan);
            const subListLevel1 = document.createElement('ul');
            subListLevel1.style.display = 'none';
            const criarSubNiveis = (itens, elementoPai) => {
                itens.forEach(itemNivel => {
                    const nivelItemLi = document.createElement('li');
                    const itemText = itemNivel.texto;
                    const progresso = itemNivel.concluida || 0;
                    nivelItemLi.innerHTML = `
                        <div class="progress-container">
                            <span>${itemText}</span>
                            <div class="progress-bar"><div class="progress-fill" style="width: ${progresso}%;background-color: ${this.getProgressColor(progresso)}"></div></div>
                            <span class="progress-text">${progresso.toFixed(2)}%</span>
                        </div>
                    `;
                    elementoPai.appendChild(nivelItemLi);
                    nivelItemLi.addEventListener('click', (event) => {
                        event.stopPropagation();
                        this.displayContent(categoria.titulo, itemText, progresso);
                    });
                    if (itemNivel.subItens?.length > 0) {
                        nivelItemLi.classList.add('has-children', 'collapsed');
                        const arrowSubSpan = document.createElement('span');
                        arrowSubSpan.classList.add('arrow');
                        nivelItemLi.prepend(arrowSubSpan);
                        const subUl = document.createElement('ul');
                        subUl.style.display = 'none';
                        criarSubNiveis(itemNivel.subItens, subUl);
                        nivelItemLi.appendChild(subUl);
                        arrowSubSpan.addEventListener('click', (event) => {
                            nivelItemLi.classList.toggle('collapsed');
                            subUl.style.display = nivelItemLi.classList.contains('collapsed') ? 'none' : 'block';
                            event.stopPropagation();
                        });
                    }
                });
            };
            criarSubNiveis(categoria.itens, subListLevel1);
            categoryItem.appendChild(subListLevel1);
            arrowSpan.addEventListener('click', (event) => {
                categoryItem.classList.toggle('collapsed');
                subListLevel1.style.display = categoryItem.classList.contains('collapsed') ? 'none' : 'block';
                event.stopPropagation();
            });
            categoryTextSpan.addEventListener('click', () => {
                this.displayCategoryContent(categoria);
                if (document.getElementById('searchInput').value !== ""){
                    this.highlightTextoNoHTML(document.getElementById('searchInput').value);
                }
            });
            this.categoryList.appendChild(categoryItem);
        });

        if (this.estudoData.length > 0) {
            this.displayCategoryContent(this.estudoData[0]);
        } else {
            this.currentCategoryTitle.textContent = 'Bem-vindo!';
            this.itemList.innerHTML = 'Selecione uma categoria à esquerda.';
        }
    }

    displayCategoryContent(categoria) {
        this.currentCategoryTitle.textContent = categoria.titulo;
        this.itemList.innerHTML = '';
        const ul = document.createElement('ul');
        ul.classList.add('indentada');
        const exibirItensComSubNivel = (itens, nivel) => {
            itens.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="marker"></span>
                    <div class="progress-container">
                        <span>${item.texto}</span>
                        <div class="progress-bar"><div class="progress-fill" style="width: ${item.concluida || 0}%;background-color: ${this.getProgressColor(item.concluida || 0)}"></div></div>
                        <span class="progress-text">${item.concluida.toFixed(2) || 0}%</span>
                    </div>
                `;
                li.style.marginLeft = `${nivel * 20}px`;
                ul.appendChild(li);
                li.addEventListener('click', (event) => {
                    event.stopPropagation();
                    this.displayContent(categoria.titulo, item.texto, item.concluida || 0);
                });
                if (item.subItens?.length > 0) {
                    const subUl = document.createElement('ul');
                    subUl.classList.add('sub-indentada');
                    exibirItensComSubNivel(item.subItens, nivel + 1);
                    li.appendChild(subUl);
                }
            });
        };

        exibirItensComSubNivel(categoria.itens, 0);
        this.itemList.appendChild(ul);
    }

    displayContent(categoryTitle, itemText, progresso) {
        this.currentCategoryTitle.textContent = categoryTitle;
        const parts = itemText.split(/(https?:\/\/[^\s]+)/g);
        let content = '';
        parts.forEach(part => {
            if (part.startsWith('http://') || part.startsWith('https://')) {
                content += `<a href="${part}" target="_blank">${part}</a>`;
            } else {
                content += part;
            }
        });
        this.itemList.innerHTML = `
            <li>
                <div class="progress-container">
                    <span>${content}</span>
                    <div class="progress-bar"><div class="progress-fill" style="width: ${progresso}%;background-color: ${this.getProgressColor(progresso)}"></div></div>
                    <span class="progress-text">${progresso.toFixed(2)}%</span>
                </div>
            </li>
        `;
    }

    printStudyStructure(arrayDeTarefas) {
        const estrutura = {};
        let saida = '';
        let ident ="  ";
        arrayDeTarefas.forEach(item => {
            const partesTarefa = item.tarefa.split(this.delimiter).map(p => p.trim());
            const categoria = item.categoria.trim();
            const tarefaPrincipal = partesTarefa[0];
            const subTarefas = partesTarefa.slice(1);
            if (!estrutura[categoria]) {
                estrutura[categoria] = [];
            }
            const adicionarItemRecursivamente = (nivel, subNiveis, concluida) => {
                const nomeNivel = subNiveis[0];
                let itemExistente = nivel.find(it => it.nome === nomeNivel);
                if (!itemExistente) {
                    const novoItem = { 
                        nome: nomeNivel, 
                        filhos: [], 
                        concluida: subNiveis.length === 1 ? concluida : 0 // Atribui concluida apenas na tarefa final
                    };
                    nivel.push(novoItem);
                    itemExistente = novoItem;
                }
                
                if (subNiveis.length > 1) {
                    adicionarItemRecursivamente(itemExistente.filhos, subNiveis.slice(1), concluida);
                }
            };            
            // Passa item.concluida para a função recursiva
            adicionarItemRecursivamente(estrutura[categoria], [tarefaPrincipal, ...subTarefas], item.concluida || 0);
        });
        for (const categoria in estrutura) {
            saida += `${ident}• ${categoria}:\n`;
            const imprimirNivel = (niveis, indentacao) => {
                niveis.forEach(nivel => {
                    // Adiciona o percentual de conclusão ao lado do nome
                    saida += `${ident}${indentacao}• ${nivel.nome} (${nivel.concluida}%)\n`;
                    if (nivel.filhos.length > 0) {
                        imprimirNivel(nivel.filhos, indentacao + '\t');
                    }
                });
            };
            imprimirNivel(estrutura[categoria], '\t');
        }
        const textarea = document.getElementById('outputArea');
        if (textarea) {
            textarea.value = saida;
        } else {
            console.error('Elemento textarea com ID "outputArea" não encontrado no HTML.');
        }
    }

    pesquisarEEsconderElementosNaSidebar(termo) {
      const sidebar = document.querySelector('.sidebar');
      if (!sidebar) {
        console.error("Elemento com a classe 'sidebar' não encontrado.");
        return;
      }
      const spans = sidebar.querySelectorAll('#categoryList span');
      spans.forEach(span => {
        const textoSpan = span.textContent.toLowerCase();
        const corresponde = textoSpan.includes(termo.toLowerCase());
        const listItem = span.closest('li');
        if (listItem) {
          listItem.style.display = corresponde ? 'block' : 'none';
          // Mostrar também os pais (se houver)
          let parentLi = listItem.parentElement.closest('li');
          while (parentLi) {
            parentLi.style.display = corresponde ? 'block' : parentLi.style.display;
            parentLi = parentLi.parentElement.closest('li');
          }
        }
        // Se o span não estiver dentro de um li (improvável com a estrutura dada), ainda assim podemos tentar mostrar/esconder o pai ul
        else {
          const parentUl = span.closest('ul');
          if (parentUl) {
            parentUl.style.display = corresponde ? 'block' : 'none';
            const parentLi = parentUl.parentElement;
            if (parentLi) {
              parentLi.style.display = corresponde ? 'block' : 'none';
            }
          }
        }
      });
      // Adicional: Mostrar a lista principal caso algum item seja encontrado
      const categoryList = sidebar.querySelector('#categoryList');
      if (categoryList) {
        const algumItemVisivel = categoryList.querySelectorAll('li[style*="display: block"]').length > 0;
        categoryList.style.display = algumItemVisivel ? 'block' : 'none';
      }
    }

    converterParaListaDeTarefas(estrutura) {
      const listaDeTarefas = [];
      function processarNivel(itens, categoriaPai, subcategoriaPai, topicoPai) {
        if (Array.isArray(itens)) {
          itens.forEach(item => {
            if (typeof item === 'string') {
              listaDeTarefas.push({
                tarefa: item,
                categoria: categoriaPai,
                subcategoria: subcategoriaPai,
                topico: topicoPai
              });
            } else if (typeof item === 'object' && item !== null && item.name) {
              listaDeTarefas.push({
                tarefa: item.name,
                categoria: categoriaPai,
                subcategoria: subcategoriaPai,
                topico: topicoPai
              });
              if (Array.isArray(item.subtopics)) {
                processarNivel(item.subtopics, categoriaPai, subcategoriaPai, item.name);
              } else if (Array.isArray(item.topics)) {
                processarNivel(item.topics, categoriaPai, subcategoriaPai, item.name);
              }
            }
          });
        }
      }    
      if (Array.isArray(estrutura)) {
        estrutura.forEach(guia => {
          if (typeof guia === 'object' && guia !== null && Array.isArray(guia.categories)) {
            guia.categories.forEach(categoria => {
              if (typeof categoria === 'object' && categoria !== null && Array.isArray(categoria.subcategories)) {
                const nomeCategoria = categoria.name;
                categoria.subcategories.forEach(subcategoria => {
                  if (typeof subcategoria === 'object' && subcategoria !== null && Array.isArray(subcategoria.topics)) {
                    const nomeSubcategoria = subcategoria.name;
                    processarNivel(subcategoria.topics, nomeCategoria, nomeSubcategoria, null);
                  }
                });
              }
            });
          }
        });
      }    
      return listaDeTarefas;
    }

    highlightTextoNoHTML(textoParaHighlight, corDeHighlight = 'lightgreen') {
      const regex = new RegExp(textoParaHighlight, 'gi'); // 'gi' para case-insensitive e global
      const elementos = document.querySelectorAll('*'); // Seleciona todos os elementos HTML
      elementos.forEach(elemento => {
        if (elemento.childNodes.length > 0) {
          elemento.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
              const textoOriginal = node.textContent;
              const novoHTML = textoOriginal.replace(
                regex,
                `<span class="highlight-temp" style="background-color: ${corDeHighlight}; font-weight: bold;">$&</span>`
              );
              if (novoHTML !== textoOriginal) {
                const tempElement = document.createElement('span');
                tempElement.innerHTML = novoHTML;
                node.parentNode.insertBefore(tempElement, node);
                node.parentNode.removeChild(node);
              }
            }
          });
        }
      });
    }

    initialize() {
        this.printStudyStructure(this.database);
        this.displayCategories();
    }

}

// Dynamically load database scripts
databasesInfo.forEach(db => {
  const script = document.createElement('script');
  script.src = db.src;
  document.head.appendChild(script);
});

// Dynamically populate the database selector
const databaseSelector = document.getElementById('databaseSelector');
databasesInfo.forEach(db => {
  const option = document.createElement('option');
  option.value = db.dataVar;
  option.textContent = `${db.label} (${db.src})`;
  option.setAttribute('flag', db.requiresConversion);
  databaseSelector.appendChild(option);
});

// Instanciação da classe
window.onload = () => {
  // Instanciação inicial com a primeira base de dados (estudoDatabase)
  const studyManager = new StudyManager(eval(databasesInfo[0].dataVar));  
  
  studyManager.initialize();
  // Adiciona o event listener ao combobox
  const databaseSelector = document.getElementById('databaseSelector');
  databaseSelector.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];
    const flagValue = selectedOption.getAttribute('flag');
    let newData;
    if (flagValue === "true"){
        newData = studyManager.converterParaListaDeTarefas(eval(selectedValue));      
    } else {
        newData = eval(selectedValue);            
    }
    // Cria uma nova instância com a base de dados selecionada
    const newStudyManager = new StudyManager(newData);
    newStudyManager.initialize();
  });
  //Adicionando evento de pesquisa
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function() {
   const termoDePesquisa = this.value.toLowerCase();
   studyManager.pesquisarEEsconderElementosNaSidebar(termoDePesquisa);
  });
  // Mostrar todas as categorias inicialmente
  studyManager.pesquisarEEsconderElementosNaSidebar('');
};