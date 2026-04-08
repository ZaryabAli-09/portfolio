"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send email");

      setFormData({ email: "", message: "" });
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#fbbf24" },
    blur: { scale: 1, borderColor: "#4b5563" },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row gap-8">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 flex items-center justify-center"
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Lets <span className="text-amber-400">Work Together</span>
          </motion.h2>
        </motion.div>

        {/* Form Section */}
        <motion.form
          onSubmit={handleSubmit}
          className="lg:w-1/2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-8 shadow-lg"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h3
            className="text-2xl font-bold mb-6"
            variants={itemVariants}
          >
            Dear Zaryab Ali,
          </motion.h3>

          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-gray-300 mb-2">
                Your Message
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                placeholder="Enter your message here"
                rows="4"
                required
                whileFocus={{ scale: 1.02, borderColor: "#fbbf24" }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Your Email
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email here"
                required
                whileFocus={{ scale: 1.02, borderColor: "#fbbf24" }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(245, 158, 11, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-amber-500 hover:bg-amber-600 text-gray-900"
                }`}
                animate={isSubmitting ? { scale: [1, 1.02, 1] } : {}}
                transition={{ repeat: isSubmitting ? Infinity : 0, duration: 1 }}
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Contact;
