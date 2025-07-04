import axios from "axios";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import HeroHeader from "@/components/HeroHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { BASE_URL } from "@/api";
import Footer from "@/components/Footer";
import ConfirmModal from "@/components/Modal";
import SpinnerModal from "@/components/SpinnerModal";

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
  useDocumentTitle("Burguer Station");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
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

    useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 440);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const schema = isRegister ? registerSchema : loginSchema;
    const dataToValidate = isRegister ? form : { email: form.email, password: form.password };
    const result = schema.safeParse(dataToValidate);
    if (result.success) {
      setIsLoading(true);
    }
    setFormErrors({});



    // Formateamos el error proveniente de Zod (schema validator)
    if (!result.success) {
      const formatted = result.error.format();
      const errors: Record<string, string> = {};

      for (const key of Object.keys(formatted) as (keyof typeof formatted)[]) {
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

    const endpoint = isRegister ? `${BASE_URL}/users` : `${BASE_URL}/auth/login`;

    try {
      const response = await axios.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (isRegister && response.data.statusCode === 201) {
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setShowConfirmModal(true);
      } else if (!isRegister && response.data.statusCode === 200) {
        login(response.data.data.jwt, response.data.data.userName);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setIsRegister(false); // volver al login después de confirmar
        }}
        icon="success"
        title="¡Registro exitoso!"
        message="Tu cuenta fue creada correctamente. Ahora puedes iniciar sesión."
        buttonText="Iniciar sesión"
      />

      <SpinnerModal isOpen={isLoading} />

      <div className="h-screen bg-black flex flex-col p-4">
        {/* <div className="h-screen bg-black flex flex-col justify-start items-center p-4 md:h-3/4 pb-0"> */}
        <HeroHeader showLogo={isDesktop} height="30" />
        <div className="  flex-1 flex flex-col items-center  overflow-y-auto pt-16 md:pt-20 pr-3 pl-3 ">
          {/* <div className="flex flex-col justify-between w-full max-w-md  bg-[#111] rounded-2xl shadow-[0_0_40px_#f97316] p-8 ring-2 ring-orange-500 mt-10"> */}
          <div className="w-full max-w-md  bg-[#111] rounded-2xl shadow-[0_0_40px_#f97316] p-4 ring-2 ring-orange-500">
            <span className="text-2xl font-bold text-white mb-4 flex justify-center">
              {isRegister ? "Crear cuenta" : "Iniciar sesión"}
            </span>

            {formErrors.general && (
              <div
                className={`mb-4 text-red-200 border rounded-lg text-sm font-medium shadow-md text-center h-8 grid place-content-center
    ${formErrors.color ? " border-green-400 " : "bg-orange-900 border-orange-700"}
  `}
              >
                <span className="text-white">{formErrors.general}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5 mb-4">
              {/* Nombre */}
              {isRegister && (
                <div>
                  {formErrors.name && <span className="text-orange-600 text-sm font-medium mb-1">{formErrors.name}</span>}
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
                {formErrors.email && <span className="text-orange-600 text-sm font-medium mb-1">{formErrors.email}</span>}
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
                {formErrors.password && (
                  <span className="text-orange-600 text-sm font-medium mb-1">{formErrors.password}</span>
                )}
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
                    <span className="text-orange-600 text-sm font-medium mb-1">{formErrors.confirmPassword}</span>
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
        {isDesktop && (<Footer />)}
      </div>
    </>
  );
}
