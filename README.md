# Componente Custom: Buy The Look

O componente **Buy The Look** é um componente personalizado desenvolvido para a plataforma de e-commerce VTEX. Ele permite que os clientes comprem dois ou mais produtos juntos.

## Instalação

Para instalar o componente **Buy The Look** em sua loja, siga os passos abaixo:

1. Mude a branch para o vendor da sua loja.
2. Faça o deploy desse app, o que pode ser visto no README.md do boilerplate.
3. Coloque o componente `"[vendor].buy-the-look": "0.x"` no manifest.json do seu StoreFront.
4. Adicione o componente ao seu template de página onde você deseja exibi-lo.

**É importante que o produto tenha a especificação com o exato nome 'Compre o Look' cadastrada, com o id dos produtos a serem exibidos, Como exemplo: `Compre o Look: 13, 66`. com a vírgula e o espaço entre os ID's.**

## Uso

Para utilizar o componente **Buy The Look**, você deve passar as seguintes props:

- `title`: (String) O Título da vitrine.
- `message`: (String) A mensagem no anterior ao preço.
- `buttonTitle`: (String) O Título do botão comprar.

Exemplo de uso:

```jsx
  "store.product": {
    "blocks": [
      "flex-layout.row#product-breadcrumb",
      "condition-layout.product#availability",
      "buy-the-look",
      "flex-layout.row#product-page-shelf",
      "flex-layout.row#mobile-fixed"
    ]
  },
  "buy-the-look": {
    "props": {
      "title": "Compre o Look",
      "message": "Compre as duas peças por",
      "buttonTitle": "Comprar o Look"
    }
  }
```
