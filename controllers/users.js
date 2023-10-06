exports.clear = async (db) => {
    const _users = await db.collection("users")
    _users.deleteMany({})
}