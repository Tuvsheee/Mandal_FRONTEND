import { FaPhone ,FaMailBulk } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";
import { Additional } from "@/types/additional";
import { showNotif } from "@/components/Layout/Alert"; 
import { LogIn, X, User, Send , Menu} from "lucide-react";
import { Hostel } from "@/types/hostel";

interface Props {
  hostel?: Hostel;
}
interface PaxItem {
  title: string;
  price: number;
}

interface AdditionalData {
  address: string;
  email: string;
  company: string;
  phone: string;
  instagram: string;
  facebook: string;
  youtube: string;
  viber: string;
  whatsapp: string;
}

const RightSideInformation = ({ hostel }: Props) => {
  const t = useTranslations("HomePage");
  const [quantity, setQuantity] = useState(1);
  const [pax, setPax] = useState<PaxItem[]>([]);
  const [additionalData, setAdditionalData] = useState<AdditionalData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [additional, setAdditional] = useState<Additional | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      content: "",
    });
  
  useEffect(() => {
    const fetchhostelData = async () => {
      try {
        const response = await axios.get("https://shinely.tanuweb.cloud/api/v1/hostel/");
        const hostelData = response.data;

        if (hostelData?.pax && Array.isArray(hostelData.pax)) {
          setPax(hostelData.pax);
        }
      } catch (error) {
        console.error("Failed to fetch hostel data:", error);
      }
    };

    fetchhostelData();
  }, []);

  useEffect(() => {
    axios
      .get("https://shinely.tanuweb.cloud/api/v1/additional/")
      .then((res) => setAdditionalData(res.data.data))
      .catch((err) => console.error("Error fetching additional data:", err));
  }, []);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        "https://shinely.tanuweb.cloud/api/v1/feedback",
        formData
      );

      const responseData = response.data.data;
      console.log("Server Response:", responseData);

      
      console.log("Form submission successful:", responseData);
      setSuccess(true);
      showNotif("Хүсэлт амжилттай илгээгдлээ!", "success"); // Success notification
      handleModalClose();
    } catch (err) {
      if (err instanceof Error) {
         // Safely access the message property
      } else {
        setError("Хүсэлт илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
      }
      console.error(err);
      showNotif("Хүсэлт илгээхэд алдаа гарлаа. Дахин оролдоно уу.", "error"); // Error notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
   
    <div className="w-full  flex flex-col border-black text-sm">
      <div className="w-full flex flex-col p-4 ">
        <div className="w-full flex items-center justify-between ">
          <span>{t("per_person")}</span>{" "}
          <span className="text-[#555555]">{hostel?.name}</span>
        </div>
      </div>
      <hr />  

      <div className="w-full flex flex-col p-4 ">
        <div className="w-full flex items-center justify-between mb-2">
          <span>{t("discount")}:</span> <span className="text-[#555555]">{hostel?.description}%</span>
        </div>{" "}
      </div>
      <hr />
      <div className="w-full flex flex-col p-4 ">
        <div className="overflow-x-auto">

        </div>
        <div className="mt-2" />
          <button
            onClick={handleModalOpen}
            className="bg-[#FEC72D] w-full flex items-center justify-center py-4 font-semibold cursor-pointer hover:bg-opacity-80"
          >
             <div className="flex items-center">
              <FaPhone className="" />
              <p className="mx-2">
                {additionalData?.phone || "Company Name"}
              </p>
            </div>
          </button>   
        </div> 
      </div>   
    {isModalOpen && additional && (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 md:mx-auto "
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="bg-[#fff] p-6 sm:p-8 rounded-lg flex flex-col shadow-lg w-full max-w-lg sm:max-w-xl text-black mx-4">
          <div className="flex justify-between mb-5">
            <h2 id="modal-title" className="text-lg sm:text-xl font-bold">
              {additional?.company || "Company Name"}
            </h2>
            <button
              className="text-black "
              onClick={handleModalClose}
            >
              <X />
            </button>
          </div>
          <div className="w-full"> 
          <form
            onSubmit={handleSubmit}
            >
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 mb-4">
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("yourName")}
                className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300 bg-[#fff] text-white"
                required
              />
            </div>          
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("yourPhone")}
                className="w-full p-3 border rounded-md mb-4 focus:ring focus:ring-blue-300 bg-[#fff] text-white"
                required
              />
               <input 
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("yourEmail")}
                className="w-full p-3 border rounded-md  mb-4  focus:ring focus:ring-blue-300 bg-[#fff] text-white"
                required
              />
            </div>

            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder={t("yourContent")}
              className="w-full p-3 border rounded-md mb-4 focus:ring focus:ring-blue-300 bg-[#fff] text-white"
              rows={4}
              required
            >
            </textarea>
            {error && <div className="text-red-600 text-sm">{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#F04748] text-white w-full px-8 py-3 rounded-lg text-lg hover:bg-[#E63939] transition-all flex items-center justify-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              > 
              {loading ? (
                "Илгээж байна..." 
              ) : (
                <>
                  {t("send")}
                  <Send className="ml-2" />
                </>
                )}
                </button>
            </form>
          </div>
        </div>
      </div>
      )}
    </>
  );
};

export default RightSideInformation;
