import PageHeader from "../components/PageHeader";

export default function Teams() {

    const teams = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: `Team ${i + 1}`,
        leader: `Leader ${i + 1}`,
        members: Math.floor(Math.random() * 10) + 3,
        status: ["Active", "Inactive"][i % 2]
    }));

    return (
        <div>
            <PageHeader 
                title="Teams"
                breadcrumb={["Home", "Teams"]}
            >
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
                    + Create Team
                </button>
            </PageHeader>

            <div className="bg-white p-6 rounded-xl shadow-sm overflow-auto">
                <table className="w-full text-sm">
                    <thead className="text-left text-gray-500 border-b">
                        <tr>
                            <th className="py-2">ID</th>
                            <th>Team Name</th>
                            <th>Leader</th>
                            <th>Members</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map(team => (
                            <tr key={team.id} className="border-b hover:bg-gray-50">
                                <td className="py-2">{team.id}</td>
                                <td>{team.name}</td>
                                <td>{team.leader}</td>
                                <td>{team.members}</td>
                                <td>
                                    <span className={`px-2 py-1 rounded-md text-xs ${
                                        team.status === "Active"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-red-100 text-red-600"
                                    }`}>
                                        {team.status}
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