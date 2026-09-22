import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Github,
  Linkedin,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowUp,
  MessageCircle,
  Loader2,
} from 'lucide-react';
import { getUserPortfolio } from '../../services/api';
import { toast } from 'react-hot-toast';

const Footer = () => {
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserPortfolio();

        console.log('User Portfolio Data:', response);

        if (response?.success && response?.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sending) return;

    // Basic validation
    if (!formData.name.trim()) {
      toast.error('Please enter your name.');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Please enter your email.');
      return;
    }

    if (!formData.message.trim()) {
      toast.error('Please enter your message.');
      return;
    }

    setSending(true);

    try {
      // Read EmailJS environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Debug information
      console.log('========== EMAILJS DEBUG ==========');
      console.log('Service ID:', serviceId);
      console.log('Template ID:', templateId);
      console.log(
        'Public Key:',
        publicKey ? `${publicKey.substring(0, 4)}****` : 'MISSING'
      );
      console.log('Form Data:', formData);
      console.log('===================================');

      // Check environment variables
      if (!serviceId) {
        throw new Error(
          'VITE_EMAILJS_SERVICE_ID is missing. Check Vercel Environment Variables.'
        );
      }

      if (!templateId) {
        throw new Error(
          'VITE_EMAILJS_TEMPLATE_ID is missing. Check Vercel Environment Variables.'
        );
      }

      if (!publicKey) {
        throw new Error(
          'VITE_EMAILJS_PUBLIC_KEY is missing. Check Vercel Environment Variables.'
        );
      }

      // Send email
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      console.log('========== EMAILJS SUCCESS ==========');
      console.log('Response:', response);
      console.log('Status:', response?.status);
      console.log('Text:', response?.text);
      console.log('=====================================');

      toast.success('Message sent successfully!');

      // Clear form
      setFormData({
        name: '',
       
