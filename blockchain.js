/* Funciones:
- newBlock: crea un nuevo bloque
- newTransaction: crea una nueva transaccion y la pone a la lista de espera de un nuevo bloque
- hash: funcion que encripta un nuevo bloque
- lastBlock: funcion que retorna el ultimo bloque de la cadena
*/

class Blockchain {
    constructor () {
        // crear una cadena y una transaccion, variables que almaceneran
        // contiene todos los bloques
        this.chain = []
        // contiene todas las transacciones en la fila de espera
        this.current_transactions = []

        // atributos 
        this.newBlock = this.newBlock.bind(this)
        this.newTransaction = this.newTransaction(this)
        this.lastBlock = this.lastBlock.bind(this)
        this.proofOfWork = this.proofOfWork.bind(this)
    }

    // metodos

    /* esta funcion sirve para crear un nuevo metodo usando la
    variable block, el indice de la variable será la longitud de
    la cadena + 1, el timestamp se actualiza, el apartado de transacciones
    se actualiza con las transacciones que se hallan almacenado en 
    current_transactions, el proof no se que es jaja, y el apartado previous
    hash se actuliza con el hash que esté en la variable previousHash */
    newBlock (proof, previousHash) {
        const block = {
            index: this.chain.length + 1,
            timestamp: new Date(),
            transactions: this.current_transactions,
            proof: proof,
            previous_hash: previousHash
        }

        // tambien se reinicia la variable current_transactions para el siguiente bloque
        this.current_transactions = []
        // se agrega el bloque creado a la cadena "chain"
        this.chain.push(block)
        return block 
    }


    /* esta funciona tiene como parametros el sender, el recipient y el amount,
    lo que hace es agregar a la variable current_transaction todo un conjunto de variables
    como sender con la variable ingresa y así para todas */
    newTransaction (sender, recipient, amount) {
        this.current_transactions.push({
            sender: sender,
            recipient: recipient,
            amount:amount
        })
        // no entiendo que hace esto
        return this.lastBlock()['index'] + 1
    }

    // no entiendo que hace esto xd
    hash (block) {
        const blockString = JSON.stringify(block)
        const hash = crypto.createHmac(process.env.HASH_TYPE, process.env.CRYPTO_SECRET)
        .update(blockString)
        .digest('hex') // que hace esto? uu

        return hash
    }

    // retorna el ultimo elemento de la cadena
    lastBlock () {
        return this.chain.slice(-1)[0]
    } 
}

module.exports = Blockchain