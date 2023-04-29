import { Link } from "react-router-dom";

export function Navigation() {
    return (
        <div className="flex justify-between py-3 mt-5">
            <Link to="tasks">
                <h1 className="font-bold text-3xl mb-4">¿Que hay para hacer?</h1>
            </Link>

            <Link to="tasks-create">
                <button className="bg-indigo-500 px-3 py-2 rounded-lg">
                    Crear una nueva responsabilidad
                </button>
            </Link>

        </div>
    )
}