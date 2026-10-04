# ADS & ADS — V3 | Como publicar no GitHub e validar no Cloudflare

## O que mudou nesta V3
- Header em faixa full-width com conteúdo centralizado.
- Headline da Hero travada em 3 linhas no desktop.
- Hero e imagem mais compactas para trazer os big numbers mais cedo.
- CTA da faixa escura centralizado de verdade.
- Cards de Ferramentas redesenhados em 2x2 com logos, microinteração e mais peso visual.

## Publicação
1. Extraia o ZIP `ADS_ADS_LP_V3_UPLOAD_GITHUB.zip`.
2. No GitHub, abra o repositório `adsandads-lp`.
3. Clique em **Add file / Adicionar arquivo → Upload files / Carregar arquivos**.
4. Selecione os arquivos da pasta V3 e envie. Os arquivos com o mesmo nome devem substituir a V2.
5. Faça commit diretamente na branch de produção (`main`, que o navegador pode traduzir como `principal`).
6. Sugestão de mensagem do commit: `Publica V3 - hero, header e ecossistema de ferramentas`.
7. No Cloudflare: **Workers & Pages → anúncios e anúncios-lp → Implantações**.
8. Espere o novo commit ficar com status verde.
9. Abra primeiro a URL específica do deploy (ex.: `xxxx.adsandads-lp.pages.dev`).
10. Depois valide `https://adsandads-lp.pages.dev` usando `Ctrl + Shift + R`.

## Checklist visual
- A headline deve aparecer em 3 linhas no desktop.
- O header deve formar uma faixa de ponta a ponta.
- O CTA da faixa escura deve estar centralizado.
- Ferramentas devem aparecer em 4 blocos mais fortes, em 2 colunas, com logos.
- Em mobile, os cards de ferramentas ficam em 1 coluna e os logos em 2 colunas.

## Observação sobre os logos
Os logos das ferramentas são carregados pela API pública do Iconify. Se algum provedor estiver temporariamente indisponível, o texto da ferramenta continua aparecendo e a LP permanece funcional.
