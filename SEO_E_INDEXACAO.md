# ADS & ADS — SEO e indexação

## Antes de pedir indexação
1. Conecte o domínio final `https://ads-ads.com.br/` ao projeto do Cloudflare Pages.
2. Confira se a página abre em HTTPS e se o domínio principal carrega a versão aprovada.
3. Não envie a URL `pages.dev` para indexação. A canonical desta versão aponta para o domínio final.
4. Abra `/robots.txt` e `/sitemap.xml` no navegador e confira se ambos respondem normalmente.

## Google Search Console
1. Crie uma propriedade do tipo **Domínio** para `ads-ads.com.br`.
2. Faça a verificação DNS no Cloudflare usando o TXT fornecido pelo Search Console.
3. Envie `https://ads-ads.com.br/sitemap.xml` em **Sitemaps**.
4. Use **Inspeção de URL** na home e solicite indexação.
5. Depois acompanhe: indexação, consultas, páginas, Core Web Vitals e recursos de IA disponíveis na conta.

## Conteúdo e arquitetura
A home institucional foi preparada para termos amplos, mas os principais serviços devem ganhar URLs próprias para competir em buscas específicas. Exemplos:
- `/servicos/growth/`
- `/servicos/trafego-pago/`
- `/servicos/tracking-analytics/`
- `/servicos/crm-marketing/`
- `/servicos/landing-pages/`
- `/servicos/marketing-ops/`
- `/servicos/automacao-tecnologia/`

Cada página deve ter intenção, title, description, H1, provas, FAQs e links internos próprios. O blog e os materiais ricos devem apontar para essas páginas.

## IA / ChatGPT Search
O `robots.txt` desta versão permite `OAI-SearchBot`. Isso torna o site elegível para descoberta na busca do ChatGPT; não existe garantia de citação ou posição.

## Checklist técnico recorrente
- PageSpeed Insights / Lighthouse em mobile e desktop
- imagens WebP e dimensões declaradas
- apenas um H1 por página
- headings em ordem lógica
- links internos descritivos
- conteúdo útil e específico, sem keyword stuffing
- sitemap atualizado sempre que novas páginas forem criadas
- canonical sempre apontando para o domínio final
- Search Console após cada publicação importante
