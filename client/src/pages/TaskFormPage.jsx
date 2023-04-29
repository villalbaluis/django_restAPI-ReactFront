import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function TaskFormPage() {

    const { register, handleSubmit, formState: {
        errors
    }, setValue
    } = useForm();

    const navigate = useNavigate()
    const params = useParams();
    const [isEditing, setIsEditing] = useState(false);

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
            const res = await updateTask(params.id, data);
            toast.success(`Se actualizó la tarea con ID: ${params.id}`, {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            });
        } else {
            const res = await createTask(data);
            toast.success("La tarea se ha creado con éxito", {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            });
        };
        navigate('/');
    });

    useEffect(() => {
        async function loadTask() {
            let estaEditando = false;
            if (params.id) {
                const res = await getTask(params.id);
                setValue('title', res.data.title)
                setValue('description', res.data.description)
                if (res.data.done == true) {
                    setValue('done', res.data.done)
                };
                estaEditando = true;
            } else {
                estaEditando = false;
            }
            setValue('boton', estaEditando ? "Dejar esto así, no más" : "Crear la vaina por hacer");
        };
        loadTask()
    }, []);


    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Ingrese un titulo"
                    {...register("title", { required: true })}
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                />
                {errors.title && <span>¡Ojito! Creo que te hace falta algo aquí</span>}
                <textarea
                    placeholder="Ingrese una descripción correspondiente"
                    rows="3"
                    {...register("description", { required: true })}
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                ></textarea>
                {errors.description && <span>Eppaaaa, que te falta describirme mejor esto</span>}

                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                        className="relative float-left -ml-[1.4rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] cursor-none appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] indeterminate:border-primary indeterminate:bg-primary indeterminate:after:absolute indeterminate:after:ml-[0.2rem] indeterminate:after:mt-[6px] indeterminate:after:w-[0.5rem] indeterminate:after:border-[0.05rem] indeterminate:after:border-solid indeterminate:after:border-white hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent indeterminate:focus:after:w-[0.5rem] indeterminate:focus:after:rounded-none indeterminate:focus:after:border-[0.125rem] indeterminate:focus:after:border-b-0 indeterminate:focus:after:border-l-0 indeterminate:focus:after:border-r-0 dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:indeterminate:border-primary dark:indeterminate:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                        type="checkbox"
                        id="checkDone"
                        {...register("done", { required: false })}
                    />
                    <label
                        className="inline-block pl-[0.15rem] hover:cursor-pointer"
                        htmlFor="checkDone"
                    >
                        ¿Esta vaina ya está lista?
                    </label>
                </div>

                <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
                    <input 
                        className="bg-indigo-500 hover:cursor-pointer"
                        type="text" 
                        disabled 
                        {...register("boton", { required: false })}
                    />
                </button>
            </form>

            {params.id &&
                <div className="flex justify-center">
                    <button
                        className="bg-red-500 p-3 rounded-lg w-48 mt-3"
                        onClick={async () => {
                            const aceptar = window.confirm("¿Esta seguro de eliminar la tarea?")
                            if (aceptar) {
                                await deleteTask(params.id);
                                toast(`Eliminada la tarea: ${params.id}, con éxito`,
                                    {
                                        position: "bottom-left",
                                        icon: '👏',
                                        style: {
                                            borderRadius: '10px',
                                            background: '#333',
                                            color: '#fff',
                                        },
                                    }
                                );
                                navigate("/tasks")
                            }
                        }}
                    >
                        Quitar esto de mi vista
                    </button>
                </div>
            }
        </div>
    )
}