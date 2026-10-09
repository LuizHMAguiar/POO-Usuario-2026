import { useState } from 'react'
import { Usuario } from './models/Usuario'

function App() {
  const [usuario] = useState(() => new Usuario('Maria', 25, '1234'))
  const [tentativa, setTentativa] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [senhaVerificada, setSenhaVerificada] = useState(false)
  const [mensagem, setMensagem] = useState('')

  function verificarSenha(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const senhaCorreta = usuario.verificarSenha(tentativa)
    setSenhaVerificada(senhaCorreta)
    setMensagem(senhaCorreta ? 'Senha correta.' : 'Senha incorreta.')
  }

  function redefinirSenha(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!novaSenha) {
      setMensagem('Digite uma nova senha.')
      return
    }

    usuario.redefinirSenha(novaSenha)
    setTentativa('')
    setNovaSenha('')
    setSenhaVerificada(false)
    setMensagem('Senha redefinida com sucesso.')
  }

  return (
    <main>
      <h1>Usuário</h1>
      <p>{usuario.apresentar()}</p>

      <form onSubmit={verificarSenha}>
        <label htmlFor="tentativa">Tente acertar a senha:</label>{' '}
        <input
          id="tentativa"
          type="password"
          value={tentativa}
          onChange={(event) => setTentativa(event.target.value)}
        />{' '}
        <button type="submit">Verificar senha</button>
      </form>

      {senhaVerificada && (
        <form onSubmit={redefinirSenha}>
          <label htmlFor="nova-senha">Nova senha:</label>{' '}
          <input
            id="nova-senha"
            type="password"
            value={novaSenha}
            onChange={(event) => setNovaSenha(event.target.value)}
          />{' '}
          <button type="submit">Redefinir senha</button>
        </form>
      )}

      <p>{mensagem}</p>
    </main>
  )
}

export default App
