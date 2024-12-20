const utilscontroller = () => {
    return {
        subscribeletter: async (req, res) => {
            console.log(121);
            
            console.log("entered ", req.body.email);

        }
    }
}

module.exports = utilscontroller;