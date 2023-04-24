import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from "react-router-dom";


export function TaskFormPage() {

    const { register, handleSubmit, formState: {
            errors
        }, setValue
    } = useForm();

    const navigate = useNavigate()
    const params = useParams();

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            console.log("Ahora empezaré a editar");
            const res = await updateTask(params.id, data);
        } else {
            const res = await createTask(data);
        };
        navigate('/');
    });

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const res = await getTask(params.id);
                console.log(res);
                setValue('title', res.data.title)
                setValue('description', res.data.description)
            };
        };
        loadTask()
    }, [])
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Ingrese un titulo"
                    {...register("title", { required: true })}
                />
                {errors.title && <span>Este campo es requerido</span>}
                <textarea
                    placeholder="Ingrese una descripción correspondiente"
                    rows="3"
                    {...register("description", { required: true })}
                ></textarea>
                {errors.description && <span>Este campo es obligatorio</span>}

                <button>Guardar tarea</button>
            </form>

            {params.id &&
                <button
                    onClick={async () => {
                        const aceptar = window.confirm("¿Esta seguro de eliminar la tarea?")
                        if (aceptar) {
                            await deleteTask(params.id);
                            navigate("/tasks")
                        }
                    }}
                >
                    Eliminar tarea
                </button>
            }
        </div>
    )
}