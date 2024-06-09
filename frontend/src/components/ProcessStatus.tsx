import { Container} from 'react-bootstrap';

const ProcessStatus = () => {
    return (
        <Container className="mt-5">
            <div className="min-h-screen flex flex-col items-center p-4">
                <h1 className="text-2xl font-bold mb-6">Senior Backend Engineer Position</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl ">
                    <div className="bg-white dark:bg-zinc-700 p-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Llamada telefónica</h2>
                        <div className="bg-zinc-100 dark:bg-zinc-600 p-2 rounded-lg mb-2">
                            <p className="font-medium">John Doe</p>
                            <div className="flex">
                                <span className="w-5 h-5 mr-1 bg-red-500 rounded-full"></span>
                                <span className="w-5 h-5 mr-1 bg-yellow-400 rounded-full"></span>
                                <span className="w-5 h-5 bg-green-500 rounded-full"></span>
                            </div>
                        </div>
                        <div className="bg-zinc-100 dark:bg-zinc-600 p-2 rounded-lg">
                            <p className="font-medium">Alice Johnson</p>
                            <div className="flex">
                                <span className="w-5 h-5 mr-1 bg-yellow-300 rounded-full"></span>
                                <span className="w-5 h-5 mr-1 bg-green-400 rounded-full"></span>
                                <span className="w-5 h-5 bg-green-500 rounded-full"></span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-700 p-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Entrevista técnica</h2>
                        <div className="bg-zinc-100 dark:bg-zinc-600 p-2 rounded-lg">
                            <p className="font-medium">Jane Smith</p>
                            <div className="flex">
                                <span className="w-5 h-5 mr-1 bg-red-400 rounded-full"></span>
                                <span className="w-5 h-5 mr-1 bg-red-200 rounded-full"></span>
                                <span className="w-5 h-5 bg-green-500 rounded-full"></span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-700 p-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Entrevista cultural</h2>
                        <div className="bg-zinc-100 dark:bg-zinc-600 p-2 rounded-lg">
                            <p className="font-medium">Bob Brown</p>
                            <div className="flex">
                                <span className="w-5 h-5 mr-1 bg-red-300 rounded-full"></span>
                                <span className="w-5 h-5 bg-green-500 rounded-full"></span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-zinc-700 p-4 rounded-lg shadow-lg">
                        <h2 className="text-lg font-semibold mb-4">Entrevista manager</h2>
                        <div className="bg-zinc-100 dark:bg-zinc-600 p-2 rounded-lg">
                            <p className="font-medium">Eva White</p>
                            <div className="flex">
                                <span className="w-5 h-5 mr-1 bg-red-100 rounded-full"></span>
                                <span className="w-5 h-5 mr-1 bg-yellow-200 rounded-full"></span>
                                <span className="w-5 h-5 mr-1 bg-green-400 rounded-full"></span>
                                <span className="w-5 h-5 bg-green-500 rounded-full"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ProcessStatus;
