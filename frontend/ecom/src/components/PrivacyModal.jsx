import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  left: "84%",
  bottom: "-15%",
  transform: "translate(-50%, -50%)",
  width: "100%", // Full width for small screens
  maxWidth: "30%", // Limit width on larger screens
  bgcolor: "background.paper",
  p: 4,
  borderRadius: "12px", // Rounded corners
  boxShadow: 24,
};

export default function PrivacyModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      aria-labelledby="privacy-modal-title"
      aria-describedby="privacy-modal-description"
      open={open}
      onClose={handleClose} // Handle closing on outside click or ESC key
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Box sx={style}>
        <div className="flex flex-col gap-3">
          <h5 className="text-black font-bold text-lg">We value your privacy</h5>
          <p className="text-black text-md">
            We collect available personal information so we can provide you with
            the best quality of service. Don't worry, we don't sell it to third
            parties.{" "}
            <a className="text-purple-950 underline hover:text-purple-600 hover:underline hover:cursor-pointer transition-colors duration-300">
              Privacy Policy
            </a>
          </p>

          <div className="flex gap-2 items-center">
            <div className="w-full">
              <button
                className="border-2 w-full p-2 border-purple-600 text-purple-950 hover:bg-purple-600 hover:text-white transition-colors duration-300"
                onClick={handleClose}
              >
                Opt Out
              </button>
            </div>
            <div className="w-full">
              <button
                className="border-2 w-full p-2 text-white bg-purple-300 hover:bg-purple-600 hover:text-white transition-colors duration-300"
                onClick={handleClose}
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
