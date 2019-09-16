const uuid = require("uuid/v1");

module.exports = {
    makeUUID : () => uuid(),
    delay : function(ms) {
        return new Promise( (resolve) => {
            setTimeout( function() {
                resolve();
            }, ms )
        })
    },
    inputErr : () => {
        console.log(
`======================== How To Use ========================
    show    : $$['current' or 'todo' or 'doing' or 'done']
    add     : $$ ID $$ [TAGS $$ ....]
    update  : $$ ID $$ state
    delete  : $$ ID
    q       : Terminate Process
============================================================
    `);
    }
}