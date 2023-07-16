const { Types } = require("mongoose");
const ErrorStatusCode = require("../utils/ErrorStatusCode");

class ClientMongoDB {
    constructor(collection) {
        this.collection = collection;
    };

    async getAll() {
        try {
            return await this.collection.find();
        } catch (e) {
            throw e;
        }
    };

    async getById(id) {
        try {
            const objectId = Types.ObjectId.isValid(id);
            if (!objectId) throw new ErrorStatusCode("El parámetro no tiene el formato correcto", 400);

            const getted =  await this.collection.find({ _id: id });
            if (getted.length < 1) throw new ErrorStatusCode("No se ha encontrado el registro", 404);

            return getted;    
        } catch (e) {
            throw e;
        }
    };

    async save(dto) {
        try {
            const dataToSave = new this.collection(dto);
            return await dataToSave.save();
        } catch (e) {
            throw e;
        }
    };

    async updateById(id, data) {
        try {
            const objectId = Types.ObjectId.isValid(id);
            if (!objectId) throw new ErrorStatusCode("El parámetro no tiene el formato correcto", 400);

            const tempDocument = new this.collection(data);
            const validationError = tempDocument.validateSync();
            if (validationError) throw new ErrorStatusCode(`Datos incorrectos`, 400);

            const updated = await this.collection.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
            if (!updated) throw new ErrorStatusCode("No se ha encontrado el registro", 404);

            return updated;             
        } catch (e) {
            throw e;
        }
    };

    async deleteById(id) {
        try {
            const objectId = Types.ObjectId.isValid(id);
            if (!objectId) throw new ErrorStatusCode("El parámetro no tiene el formato correcto", 400);

            const deleted =  await this.collection.deleteOne({ _id: id });
            if (deleted.deletedCount < 1) throw new ErrorStatusCode("No se ha encontrado el registro", 404);

            return deleted; 
        } catch (e) {
            throw e;
        }
    };
};

module.exports = { ClientMongoDB };