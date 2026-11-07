import { useState, useContext, useEffect } from "react";

import {
  UserCircle,
  Mail,
  Phone,
  Camera,
  Lock,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
} from "lucide-react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";

const initialProfile = {
  name: "John Smith",
  email: "john@example.com",
  phone_number: "+1 555 123 4567",
  image: "",
};

export default function Profile() {

  const { user, updateUser } = useContext(AuthContext);

  const [profile, setProfile] = useState(() => ({
      ...initialProfile,
      ...user,
      phone_number: user?.phone_number ?? initialProfile.phone_number,
      image: user?.image ?? ""
  }));

  useEffect(() => {
      if (user) {
          setProfile(previous => ({
              ...previous,
              ...user,
              phone_number: user.phone_number ?? previous.phone_number,
              image: user.image ?? previous.image
          }));
      }
  }, [user]);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswords((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors({ image: "Please select a valid image." });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ image: "The image must not exceed 5 MB." });
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfile((previous) => ({
        ...previous,
        image: reader.result,
      }));

      setErrors({});
    };

    reader.readAsDataURL(file);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((previous) => ({
      ...previous,
      [field]: !previous[field],
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!profile.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!profile.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!profile.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required.";
    }

    const changingPassword =
      passwords.currentPassword ||
      passwords.newPassword ||
      passwords.confirmPassword;

    if (changingPassword) {
      if (!passwords.currentPassword) {
        newErrors.currentPassword = "Current password is required.";
      }

      if (passwords.newPassword.length < 8) {
        newErrors.newPassword =
          "The new password must contain at least 8 characters.";
      }

      if (passwords.newPassword !== passwords.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(newErrors);
    setMessage("");

    if (Object.keys(newErrors).length > 0) return;

    updateUser({
      name: profile.name,
      email: profile.email,
      phone_number: profile.phone_number,
      image: profile.image
  });

    // Frontend demonstration only.
    // Password verification and saving will be handled by Laravel later.
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setMessage("Profile updated successfully!");
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass = "mb-2 block text-sm font-medium text-slate-700";

  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your personal information and account security.
          </p>
        </div>

        {message && (
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            <CheckCircle size={18} />
            {message}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile information */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-lg font-semibold text-slate-800">
                Personal Information
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Update your profile details.
              </p>
            </div>

            <div className="space-y-6 p-6">
              {/* Profile picture */}
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserCircle size={64} className="text-slate-400" />
                  )}
                </div>

                <div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                    <Camera size={17} />
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  <p className="mt-2 text-xs text-slate-500">
                    JPG, PNG or GIF. Maximum size: 5 MB.
                  </p>

                  {errors.image && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.image}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <div className="relative">
                    <UserCircle
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      className={`${inputClass} pl-10`}
                      placeholder="Enter your name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Email Address</label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      className={`${inputClass} pl-10`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className={labelClass}>Phone Number</label>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="tel"
                      name="phone_number"
                      value={profile.phone_number}
                      onChange={handleProfileChange}
                      className={`${inputClass} pl-10`}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone_number && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.phone_number}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Password */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-lg font-semibold text-slate-800">
                Change Password
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Leave these fields empty if you do not want to change your password.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
              {[
                {
                  name: "currentPassword",
                  label: "Current Password",
                  key: "current",
                },
                {
                  name: "newPassword",
                  label: "New Password",
                  key: "new",
                },
                {
                  name: "confirmPassword",
                  label: "Confirm New Password",
                  key: "confirm",
                },
              ].map((field) => (
                <div
                  key={field.name}
                  className={field.name === "currentPassword" ? "md:col-span-2" : ""}
                >
                  <label className={labelClass}>{field.label}</label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type={showPasswords[field.key] ? "text" : "password"}
                      name={field.name}
                      value={passwords[field.name]}
                      onChange={handlePasswordChange}
                      className={`${inputClass} pl-10 pr-11`}
                      placeholder={field.label}
                    />

                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility(field.key)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      aria-label={`Toggle ${field.label} visibility`}
                    >
                      {showPasswords[field.key] ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors[field.name] && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Save button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
