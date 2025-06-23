import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import HeroHeader from "@/components/HeroHeader";

// Esquemas con Zod
const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

const registerSchema = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Correo inválido"),
    password: z
      .string()
      .min(8, "Debe tener mínimo 8 caracteres")
      .regex(/[A-Za-z]/, "Debe tener al menos una letra")
      .regex(/\d/, "Debe tener al menos un número")
      .regex(/[@$!%*?&.#]/, "Debe tener al menos un carácter especial"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

export default function LoginPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useAuth();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const schema = isRegister ? registerSchema : loginSchema;
    const dataToValidate = isRegister ? form : { email: form.email, password: form.password };

    const result = schema.safeParse(dataToValidate);

    if (!result.success) {
      const formatted = result.error.format();
      const errors: Record<string, string> = {};

      for (const key in formatted) {
        if (key !== "_errors" && formatted[key]?._errors?.[0]) {
          errors[key] = formatted[key]._errors[0];
        }
      }

      setFormErrors(errors);
      return;
    }

    const payload = isRegister
      ? {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      : {
          email: form.email,
          password: form.password,
        };

    const endpoint = isRegister ? "http://localhost:3000/users" : "http://localhost:3000/auth/login";

    try {
      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Respuesta de la API:", response);

      if (isRegister && response.data.statusCode === 201) {
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setFormErrors({
          general: response.data.message,
          color: "green",
        });
      } else if (!isRegister && response.data.statusCode === 200) {
        login(response.data.data.jwt, response.data.data.userName);
        console.log("✅ Token guardado en localStorage");
        navigate("/");
      } else {
        setFormErrors({
          general: "Respuesta inválida del servidor",
          color: "orange",
        });
      }
    } catch (error: any) {
      console.error("❌ Error en la petición:", error?.response?.data?.message);
      if (error.status === 400) {
        setFormErrors({
          general: "Datos inválidos. Por favor, revisa tu información.",
        });
      } else {
        setFormErrors({
          general: error?.response?.data?.message || "Error inesperado al comunicarse con el servidor",
        });
      }
    }
  };

  return (
    <div className="">
      <div className="h-screen bg-black flex flex-col justify-start items-center p-4 md:h-96 ">
        <HeroHeader />
        <div className="flex flex-col justify-between w-full max-w-md  bg-[#111] rounded-2xl shadow-[0_0_40px_#f97316] p-8 ring-2 ring-orange-500 mt-10">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            {isRegister ? "Crear cuenta" : "Iniciar sesión"}
          </h2>
          {formErrors.general && (
            <div
              className={`mb-4 text-red-200 border p-3 rounded-lg text-sm font-medium shadow-md text-center
    ${formErrors.color ? " border-green-400 " : "bg-orange-900 border-orange-700"}
  `}
            >
              <p className="text-white">{formErrors.general}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5 mb-4">
            {/* Nombre */}
            {isRegister && (
              <div>
                {formErrors.name && <p className="text-orange-600 text-sm font-medium mb-1">{formErrors.name}</p>}
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg bg-black text-white border border-gray-600 p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="Tu nombre"
                />
              </div>
            )}

            {/* Correo */}
            <div>
              {formErrors.email && <p className="text-orange-600 text-sm font-medium mb-1">{formErrors.email}</p>}
              <input
                //   type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg bg-black text-white border border-gray-600 p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="ejemplo@correo.com"
              />
            </div>

            {/* Contraseña */}
            <div>
              {formErrors.password && <p className="text-orange-600 text-sm font-medium mb-1">{formErrors.password}</p>}
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg bg-black text-white border border-gray-600 p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                placeholder="Contraseña"
              />
            </div>

            {/* Confirmar contraseña */}
            {isRegister && (
              <div>
                {formErrors.confirmPassword && (
                  <p className="text-orange-600 text-sm font-medium mb-1">{formErrors.confirmPassword}</p>
                )}
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg bg-black text-white border border-gray-600 p-3 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="Confirmar contraseña"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300"
            >
              {isRegister ? "Registrarse" : "Entrar"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400 text-center">
            {isRegister ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}{" "}
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setFormErrors({});
                setForm({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                });
              }}
              className="text-white hover:text-orange-500 font-semibold transition"
            >
              {isRegister ? "Inicia sesión" : "Regístrate"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
