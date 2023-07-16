const { Types } = require("mongoose");

class ClientMongoDB {
    constructor(collection, connect) {
        this.collection = collection;
        this.connect = connect;
    };

    async getAll() {
        try {
            return await this.collection.find();
        } catch (e) {
            throw new Error(`Error en obtener datos: ${e}`)
        }
    };

    async getById(id) {
        try {
            const objectId = !Types.ObjectId.isValid(id);
            if (objectId) return null;

            return await this.collection.find({ _id: id });
        } catch (e) {
            throw new Error(`Error en obtener por id: ${e}`)
        }
    };

    async save(dto) {
        try {
            const dataToSave = new this.collection(dto);
            return await dataToSave.save();
        } catch (e) {
            throw new Error(`Error en guardar: ${e}`)
        }
    };

    async updateById(id, data) {
        try {
            const objectId = !Types.ObjectId.isValid(id);
            if (objectId) return null;

            const tempDocument = new this.collection(data);

            const validationError = tempDocument.validateSync();

            if (validationError) throw new Error(`Datos incorrectos`);

            return await this.collection.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
            
        } catch (e) {
            throw new Error(`Error al actualizar ${e}`)
        }
    };

    async deleteById(id) {
        try {
            const objectId = !Types.ObjectId.isValid(id);
            if (objectId) return null;

            return await this.collection.deleteOne({ _id: id });
        } catch (e) {
            throw new Error(`Error al eliminar: ${e}`)
        }
    };
};

module.exports = { ClientMongoDB };