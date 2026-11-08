# Recriar Centro Educacional — site institucional

Site de uma página (landing page) da Recriar Centro Educacional, em Cametá (PA). Feito só com HTML, CSS e JavaScript, sem frameworks e sem etapa de build: basta abrir o `index.html` no navegador.

> **Status:** versão de demonstração. Alguns textos e dados são exemplos e precisam ser conferidos antes da publicação (veja [Antes de publicar](#antes-de-publicar)).

## Estrutura

```
index.html        conteúdo da página, SEO e dados estruturados
style.css         estilos, cores e tamanhos de fonte
script.js         menu mobile, formulário e eventos de rastreamento
logo-recriar.jpg  logomarca (header e ícone da aba)
imagens/
  hero.jpeg        foto principal, no topo da página
  escola.jpeg      foto da seção "Sobre a escola"
  professoras.jpeg foto da seção "Nossa equipe"
```

## Como ver o site no computador

Abra o `index.html` com dois cliques. Para testar com um servidor local, na pasta do projeto:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Como editar

### Textos, telefone, e-mail e endereço

Tudo está no `index.html`. Use a busca do editor (Ctrl+F) para achar e trocar:

| O que trocar | O que procurar |
|---|---|
| Telefone | `98611-1984` e `5591986111984` |
| WhatsApp | `5591981035587` (botão flutuante e link de contato) |
| E-mail | `centroeducacional21@hotmail.com` |
| Endereço | `Travessa Paulo Nogueira` |
| Horário de atendimento | `Atendimento:` |
| Equipe e professoras | seção `id="equipe"` |
| Turmas | seção `id="turmas"` |

Os dados de contato também aparecem no bloco `application/ld+json` no início do arquivo (usado pelo Google). Atualize lá também.

### Fotos

Troque os arquivos da pasta `imagens/` mantendo os mesmos nomes. Se usar outro nome ou formato, ajuste o `src` no `index.html` e o texto do atributo `alt`, que descreve a foto para leitores de tela.

Recomendações: JPG ou WebP, até cerca de 200 KB por foto. A foto do topo é exibida na vertical (proporção 4:5).

### Mapa

O mapa é um `iframe` do Google Maps na seção de contato. Para trocar, abra o local no Google Maps, clique em **Compartilhar → Incorporar um mapa** e substitua o valor do `src` do `iframe`.

### Cores e fontes

No início do `style.css` ficam as variáveis de cor (`--orange`, `--blue`, `--peach` e outras) e as fontes (`--serif` e `--sans`). As fontes Fraunces e Nunito Sans vêm do Google Fonts; sem internet, o navegador usa fontes do sistema.

O tamanho geral do texto em telas grandes é controlado pelas três linhas `html{font-size:...}` no final do `style.css`. Aumente ou diminua as porcentagens para ajustar.

## Formulário de contato

O formulário valida os campos no navegador, mas **não envia os dados a lugar nenhum**: a mensagem de sucesso é só demonstrativa. Para ativar o envio, edite o `script.js` no trecho marcado com `TODO` (dentro do evento `submit`) e conecte a um serviço de sua escolha, como Formspree, Web3Forms ou uma API própria. Os dados podem ser lidos com `new FormData(form)`.

## Rastreamento de eventos

Os cliques em botões e links importantes têm o atributo `data-track` no HTML e passam pela função `track()` do `script.js`, que por enquanto só registra o evento no `dataLayer`. Eventos disponíveis: `cta_agendar_visita`, `cta_conheca_escola`, `click_whatsapp`, `click_telefone`, `click_email`, `click_instagram` e `form_submit`.

Para ligar ao Google Analytics ou ao Google Tag Manager, instale o código do serviço e altere apenas o corpo da função `track()`. A interface não precisa mudar.

## Publicação no GitHub Pages

1. Envie o projeto para um repositório público no GitHub, com o `index.html` na raiz.
2. Em **Settings → Pages**, escolha a branch `main` e a pasta `/ (root)`.
3. O site fica em `https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/`.

## Antes de publicar

- [ ] Trocar o endereço fictício `www.exemplo-recriar.com.br` (canonical, Open Graph e JSON-LD) pelo endereço real.
- [ ] Remover `<meta name="robots" content="noindex, nofollow">` quando o site puder aparecer no Google.
- [ ] Conferir horário de atendimento, nomes e descrições da equipe e textos das turmas.
- [ ] Confirmar a autorização dos responsáveis para fotos em que apareçam crianças.
- [ ] Trocar o link "Facebook (exemplo)" do rodapé por uma rede social real ou remover.
- [ ] Ligar o formulário a um serviço de envio.
- [ ] Testar em celular, tablet e computador.

## Acessibilidade

Menu mobile com `aria-expanded` e fechamento por `Escape`, foco visível, navegação por teclado, campos de formulário com `label` e mensagens de erro anunciadas por leitores de tela, e animações reduzidas quando o sistema pede (`prefers-reduced-motion`).
