# ADS & ADS — Como publicar a LP V2 no GitHub e ver no Cloudflare

## 1. Extraia o ZIP
Abra `ADS_ADS_LP_V2_UPLOAD_GITHUB.zip` e extraia a pasta no seu computador.

## 2. Confirme os arquivos
Dentro da pasta devem existir diretamente:

- `index.html`
- `styles.css`
- `app.js`
- `site.config.js`
- `content.default.json`
- `logo-symbol.png`
- `hero-ecosystem.png`

## 3. Abra o repositório do GitHub
Use o mesmo repositório que já está conectado ao Cloudflare: `janainaoliveiira/adsandads-lp`.

## 4. Substitua a V1 pela V2
No GitHub, clique em **Add file / Adicionar arquivo → Upload files / Carregar arquivos**.

No Windows, entre na pasta extraída, selecione **os sete arquivos acima** e arraste para a área de upload. Não envie o ZIP e não envie uma pasta externa.

Os arquivos com o mesmo nome (`index.html`, `styles.css`, `app.js` etc.) serão substituídos pelo novo commit.

## 5. Faça o commit
Na mensagem do commit use:

`Publica LP V2 - refinamento visual e liquid glass`

Faça o commit na branch de produção (`main`; o Chrome pode traduzir visualmente como `principal`).

## 6. Aguarde o Cloudflare
Vá em **Cloudflare → Workers & Pages → anúncios e anúncios-lp → Implantações**.

Aguarde aparecer um novo deploy com o commit acima e o status **✓ verde**.

## 7. Teste primeiro a URL do deploy
Clique na URL única do deploy (algo como `https://xxxxxxxx.adsandads-lp.pages.dev`). Assim você garante que está vendo exatamente o novo commit.

## 8. Depois teste a URL principal
Abra `https://adsandads-lp.pages.dev` e use **Ctrl + Shift + R** ou janela anônima.

## 9. Checklist visual da V2
Você deve ver:

- fundo off-white/lavanda mais confortável;
- hero mais compacto e headline em 3 linhas no desktop;
- big numbers ainda na primeira experiência de rolagem;
- seção escura de dor como faixa horizontal com 4 cenários;
- fluxo Estratégia → Otimização com gradiente sutil;
- CTA da solução em bloco glass mais rico e com mais respiro;
- `O escopo muda.` + `O padrão de entrega, não.` em duas linhas;
- ferramentas com cards mais destacados e CTAs centralizados;
- Sobre ADS & ADS com maior presença;
- cards de Fit divididos em Cenário / O que precisa estruturar / Faz sentido para;
- qualificação final em estrutura de comparação, sem a faixa “Quando faz mais sentido...”;
- CTA final full-width em gradiente;
- rodapé com navegação, redes sociais e crédito de desenvolvimento;
- hover/click jelly nos menus e CTAs;
- formulários com estética liquid glass.

## 10. Não conecte o domínio final ainda
Use o `pages.dev` como homologação. Só conecte o domínio oficial depois que desktop, tablet, mobile, formulários, tracking e links estiverem aprovados.

## Observação sobre os formulários
Nesta V2 eles estão visualmente prontos, mas a captação real depende de `site.config.js`:

- `whatsappNumber`: número que receberá a conversa;
- `leadWebhook`: webhook do Make/n8n/Google Apps Script para salvar o lead;
- redes sociais: URLs do rodapé.
