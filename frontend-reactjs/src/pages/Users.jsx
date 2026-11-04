
import { useMemo, useState } from "react";
import {
  Plus,
  Users as UsersIcon,
  UserCheck,
  UserX,
  Search,
  Pencil,
  Trash2,
  X,
  Save,
  Mail,
  UserCircle,
  Phone,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import Layout from "../components/Layout";

const initialUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    phone_number: "+1 555 123 4567",
    password: "DemoPass123!",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone_number: "+1 555 987 6543",
    password: "DemoPass123!",
    role: "Editor",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    phone_number: "+1 555 456 7890",
    password: "DemoPass123!",
    role: "Author",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    phone_number: "+1 555 321 0987",
    password: "DemoPass123!",
    role: "Editor",
    status: "Active",
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone_number: "",
  password: "",
  confirmPassword: "",
  role: "Author",
  status: "Active",
};

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone_number.toLowerCase().includes(query)
    );
  }, [users, search]);

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  const openCreateForm = () => {
    setSelectedUser(null);
    setFormData(emptyForm);
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsFormOpen(true);
  };

  const openEditForm = (user) => {
    setSelectedUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      password: "",
      confirmPassword: "",
      role: user.role,
      status: user.status,
    });

    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedUser(null);
    setFormData(emptyForm);
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
      ...(name === "password" || name === "confirmPassword"
        ? { password: "", confirmPassword: "" }
        : {}),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === formData.email.trim().toLowerCase() &&
        user.id !== selectedUser?.id
    );

    if (emailExists) {
      newErrors.email = "This email is already registered.";
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required.";
    }

    if (!selectedUser && !formData.password) {
      newErrors.password = "Password is required.";
    } else if (
      formData.password &&
      formData.password.length < 8
    ) {
      newErrors.password = "Password must contain at least 8 characters.";
    }

    if (formData.password || formData.confirmPassword) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone_number: formData.phone_number.trim(),
      role: formData.role,
      status: formData.status,
    };

    if (formData.password) {
      userData.password = formData.password;
    }

    if (selectedUser) {
      setUsers((current) =>
        current.map((user) =>
          user.id === selectedUser.id
            ? { ...user, ...userData }
            : user
        )
      );
    } else {
      setUsers((current) => [
        ...current,
        {
          id: Date.now(),
          ...userData,
        },
      ]);
    }

    closeForm();
  };

  const handleDelete = (user) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${user.name}"?`
    );

    if (confirmed) {
      setUsers((current) =>
        current.filter((item) => item.id !== user.id)
      );
    }
  };

  const getRoleStyle = (role) => {
    const styles = {
      Admin: "bg-purple-50 text-purple-700",
      Editor: "bg-blue-50 text-blue-700",
      Author: "bg-amber-50 text-amber-700",
    };

    return styles[role] || "bg-slate-100 text-slate-600";
  };

  const getStatusStyle = (status) => {
    return status === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-red-50 text-red-700";
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  const renderPasswordField = (
    fieldName,
    label,
    visible,
    toggleVisibility
  ) => (
    <div>
      <label
        htmlFor={fieldName}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <Lock
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id={fieldName}
          name={fieldName}
          type={visible ? "text" : "password"}
          value={formData[fieldName]}
          onChange={handleChange}
          placeholder={
            selectedUser
              ? "Leave blank to keep current password"
              : "Minimum 8 characters"
          }
          autoComplete="new-password"
          className={`${inputClass} pl-11 pr-12`}
        />

        <button
          type="button"
          onClick={toggleVisibility}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {errors[fieldName] && (
        <p className="mt-2 text-sm text-red-600">
          {errors[fieldName]}
        </p>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Users Management
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your blog users, roles and account status.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            New User
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Users
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {users.length}
                </h2>
              </div>

              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <UsersIcon size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active Users
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {activeUsers}
                </h2>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <UserCheck size={24} />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Inactive Users
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {inactiveUsers}
                </h2>
              </div>

              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <UserX size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email or phone..."
              className={`${inputClass} bg-slate-50 pl-12`}
            />
          </div>
        </div>

        {/* Users table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    User
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Phone Number
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Role
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                          <UserCircle size={25} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {user.name}
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <Mail size={13} />
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone size={15} />
                        {user.phone_number}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getRoleStyle(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(user)}
                          title="Edit user"
                          aria-label={`Edit ${user.name}`}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(user)}
                          title="Delete user"
                          aria-label={`Delete ${user.name}`}
                          className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <p className="font-semibold text-slate-700">
                        No users found
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Try another search term.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>

        {/* Create / Edit modal */}
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4">
            <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedUser ? "Edit User" : "Create User"}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Enter the user information below.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeForm}
                  aria-label="Close form"
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    maxLength={100}
                    className={inputClass}
                  />

                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@example.com"
                    maxLength={150}
                    className={inputClass}
                  />

                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone_number"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Phone Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="phone_number"
                      name="phone_number"
                      type="tel"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="+1 555 123 4567"
                      maxLength={30}
                      className={`${inputClass} pl-11`}
                    />
                  </div>

                  {errors.phone_number && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.phone_number}
                    </p>
                  )}
                </div>

                {/* Password */}
                {renderPasswordField(
                  "password",
                  selectedUser
                    ? "New Password (optional)"
                    : "Password",
                  showPassword,
                  () => setShowPassword((current) => !current)
                )}

                {/* Confirm Password */}
                {renderPasswordField(
                  "confirmPassword",
                  "Confirm Password",
                  showConfirmPassword,
                  () =>
                    setShowConfirmPassword((current) => !current)
                )}

                {/* Role */}
                <div>
                  <label
                    htmlFor="role"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Role
                  </label>

                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`${inputClass} bg-white`}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Author">Author</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label
                    htmlFor="status"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Account Status
                  </label>

                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`${inputClass} bg-white`}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    <Save size={17} />
                    {selectedUser ? "Save Changes" : "Create User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
