import PageHeader from "../components/PageHeader";

export default function Employees() {

    const employees = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: `Employee ${i + 1}`,
        email: `employee${i + 1}@mail.com`,
        phone: `08123${String(i).padStart(6, "0")}`,
        loyalty: ["Bronze", "Silver", "Gold"][i % 3]
    }));

    return (
        <div>
            <PageHeader 
                title="Employees"
                breadcrumb={["Home", "Employees"]}
            >
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
                    + Add Employee
                </button>
            </PageHeader>

            <div className="bg-white p-6 rounded-xl shadow-sm overflow-auto">
                <table className="w-full text-sm">
                    <thead className="text-left text-gray-500 border-b">
                        <tr>
                            <th className="py-2">ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Loyalty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp.id} className="border-b hover:bg-gray-50">
                                <td className="py-2">{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td>{emp.phone}</td>
                                <td>
                                    <span className="px-2 py-1 rounded-md text-xs bg-gray-100">
                                        {emp.loyalty}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}