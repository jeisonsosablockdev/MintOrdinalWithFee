import {
    ByteString,
    prop,
    method,
    assert,
    len,
} from 'scrypt-ts'
import { OrdinalNFT } from 'scrypt-ord'

/**
 * Mint3DOrdinal es un contrato inteligente basado en sCrypt que extiende
 * la clase OrdinalNFT de scrypt-ord. Este contrato está diseñado para permitir
 * la inscripción (minting) de archivos 3D como NFTs ordinales en la blockchain BSV.
 * 
 * Características principales:
 * - Extiende la clase OrdinalNFT, heredando toda su funcionalidad para manejar Ordinals.
 * - Permite especificar un collectionID que identifica la colección a la que pertenece el NFT.
 * - Valida que el collectionID no sea vacío antes de permitir la ejecución del método unlock.
 * - No impone restricciones económicas (como fees) ni de tiempo (como locktime).
 * - Toda la lógica de inscripción se realiza desde el frontend/backend usando métodos como inscribe().
 */
export class Mint3DOrdinal extends OrdinalNFT {
    /**
     * Identificador único de la colección a la que pertenece este ordinal.
     */
    @prop()
    readonly collectionID: ByteString

    /**
     * Constructor del contrato.
     * @param collectionID Identificador de colección (en formato ByteString).
     */
    constructor(collectionID: ByteString) {
        super()
        this.init(...arguments)
        this.collectionID = collectionID
    }

    /**
     * Método principal para desbloquear el contrato y permitir la inscripción.
     * Este método valida únicamente que el collectionID no esté vacío.
     * El contenido a inscribir (como un archivo .glb) es gestionado fuera del contrato.
     */
    @method()
    public unlock() {
        // Validación mínima para autorizar mint
        assert(len(this.collectionID) > 0n, 'collectionID requerido')
    }
}
