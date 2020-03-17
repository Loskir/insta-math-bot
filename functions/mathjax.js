const mathjax = require('mathjax')

let MathJax

exports.prepareMathjax = async () => {
  MathJax = await mathjax.init({
    loader: {
      paths: {mathjax: 'mathjax/es5'},
      load: ['input/tex', 'output/svg'],
    },
  })
  return true
}

exports.getSvg = (data) => MathJax.startup.adaptor.innerHTML(MathJax.tex2svg(data, {display: true}))
