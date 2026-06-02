import "./estilos.scss"
export function Ingreso(){
    return (
        <div className="container">
            <h1 className="titulo">Esta es la vista del Lógin</h1>
            <form className="formulario">
                <div className="filaFormulario">
                    <label className="textoFilaFormulario">Usuario: </label> <input placeholder="Nombre de usuario"className="inputFilaFormulario"/>
                </div>
            </form>
        </div>
    )
}