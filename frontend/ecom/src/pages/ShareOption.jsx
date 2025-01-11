import { Copy } from "lucide-react";
import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";
import { toast } from "react-toastify";

const ShareOptions = ({ product, onClose }) => {
  const shareUrl = window.location.href; // Current product URL
  const shareTitle = product.ProductName;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.info("Link copied to clipboard!");
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold mb-4">Share This Product</h2>
        <div className="flex flex-col gap-4">
          {/* Facebook */}
          <FacebookShareButton url={shareUrl} quote={shareTitle}>
            <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
              <FacebookIcon size={32} className="text-blue-700" />
              <span>Share on Facebook</span>
            </div>
          </FacebookShareButton>

          {/* Twitter */}
          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
              <TwitterIcon size={32} className="text-blue-400" />
              <span>Share on Twitter</span>
            </div>
          </TwitterShareButton>

          {/* WhatsApp */}
          <WhatsappShareButton url={shareUrl} title={shareTitle}>
            <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
              <WhatsappIcon size={32} className="text-green-500" />
              <span>Share on WhatsApp</span>
            </div>
          </WhatsappShareButton>

          {/* LinkedIn */}
          <LinkedinShareButton url={shareUrl} title={shareTitle}>
            <div className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
              <LinkedinIcon size={32} className="text-blue-800" />
              <span>Share on LinkedIn</span>
            </div>
          </LinkedinShareButton>

          {/* Copy Link */}
          <button
            onClick={copyLink}
            className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
          >
            <Copy size={32} className="text-gray-500" />
            <span>Copy Link</span>
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareOptions;
