import { Suspense } from 'react';
import Layout from '@/app/(dashboard)/layout'
import { GetFormStats } from '@/actions/form';
import { LuView } from 'react-icons/lu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  return (
    <div className='container '>
      <Layout />
      <Suspense>
        <CardStatsWrapper />
      </Suspense>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCard loading={false} data={stats} />;
}

interface StatsCardProps {
  data: Awaited<ReturnType<typeof GetFormStats>>;
  loading: boolean;
}

function StatsCard(props: StatsCardProps) {
  const { data, loading } = props;

  return (
    <div className='w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
      <SingleStatsCard
        title='Total Visits'
        icon={<LuView className='text-blue-600' />}
        helperText="All time Form Visits"
        value={data.visits.toLocaleString()}
        loading={loading}
        className='shadow-md shadow-blue-600'
      />
    </div>
  );
}

function SingleStatsCard({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  helperText: string;
  loading: boolean;
  className: string;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {loading && <Skeleton><span>0</span></Skeleton>}
        </div>
      </CardContent>
    </Card>
  );
}
