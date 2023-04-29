import { useNavigate } from "react-router-dom";

export function TaskCard({ task }) {

    const navigate = useNavigate();

    return (
        <div
            className="grid grid-rows-3 grid-flow-col gap-4 bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer rounded"
            onClick={() => {
                navigate(`/tasks/${task.id}`)
            }}
        >
            <div className="row-span-3 place-content-around">
                <h2 className="underline-offset-8">{task.id}</h2>
            </div>
            <div className="col-span-2">
                <h1 className="font-bold uppercase">{task.title}</h1>
            </div>
            <div className="row-span-2 col-span-2 ">
                <p className="text-slate-400">{task.description}</p>
            </div>
        </div>

    )
}