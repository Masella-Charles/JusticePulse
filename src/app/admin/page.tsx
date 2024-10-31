import Image from "next/image";
import Link from "next/link";
import { Client, Databases, Query } from "appwrite";

import { StatCard } from "@/components/StatCard";
import { columns } from "../../components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { Petition, Report } from "../../lib/actions/appwrite.actions"

import '../styles/admin.css';

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)

const databases = new Databases(client)

const AdminPage = async () => {
  const petitions = await databases.listDocuments<Petition>(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_PETITION_COLLECTION_ID!,
    [Query.orderDesc('createdAt'), Query.limit(100)]
  )

  const reports = await databases.listDocuments<Report>(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_REPORT_COLLECTION_ID!,
    [Query.orderDesc('createdAt'), Query.limit(100)]
  )

  const activePetitionsCount = petitions.documents.filter(p => p.stage !== 'victory').length
  const victoryPetitionsCount = petitions.documents.filter(p => p.stage === 'victory').length
  const reportsCount = reports.total

  return (
    <div className="admin-container fade-in">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer hover-effect">
        <img
            src='https://img.freepik.com/free-vector/realistic-jamhuri-day_23-2148721687.jpg?t=st=1727269614~exp=1727273214~hmac=27d9ba45882867384879f5841f5d00a1515834d31c22cc01c7591c3d520e7b88&w=68'
            alt="JusticePulse logo"
            className="admin-logo"
          />
        </Link>

        <p className="admin-title">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="admin-welcome">
          <h1>Welcome to JusticePulse Admin 👋</h1>
          <p>
            Manage petitions and reports to drive civic engagement
          </p>
        </section>

        <section className="admin-stats grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          type="active"
          count={activePetitionsCount}
          label="Active Petitions"
        />
        <StatCard
          type="victory"
          count={victoryPetitionsCount}
          label="Victorious Petitions"
        />
        <StatCard
          type="reports"
          count={reportsCount}
          label="Total Reports"
        />
        </section>

        <section className="admin-table-section">
          <h2 className="admin-table-title">Recent Petitions</h2>
          <div className="custom-scrollbar">
            <DataTable columns={columns} data={petitions.documents} />
          </div>
        </section>

        <section className="admin-table-section">
          <h2 className="admin-table-title">Recent Reports</h2>
          <div className="custom-scrollbar">
            <DataTable columns={columns} data={reports.documents} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminPage