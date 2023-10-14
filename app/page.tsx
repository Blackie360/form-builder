import { Suspense } from 'react';
import Layout from '@/app/(dashboard)/layout'
import { GetFormStats } from '@/actions/form';
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import CreateFormBtn from '@/components/CreateFormBtn';

export default function Home() {
  return (
    <div className='container '>
      <Layout />
      <Suspense fallback={<StatsCard loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className='my-6'/>
      <h2 className='text-2xl font-bold text-orange-600 '>Your Forms</h2>
      <Separator  className='my-6'/>
      <CreateFormBtn />

    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();
  return <StatsCard loading={false} data={stats} />;
}

interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>;
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
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className='shadow-md shadow-blue-600'
      />
      <SingleStatsCard
        title='Total Submissions'
        icon={<FaWpforms className='text-yellow-600' />}
        helperText="All time Form Submissions"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className='shadow-md shadow-orange-600'
      />
      <SingleStatsCard
        title='Submission Rate '
        icon={<HiCursorClick className='text-green-600' />}
        helperText="Visits that results in form submission"
        value={data?.visits.toLocaleString() + "%" || ""}
        loading={loading}
        className='shadow-md shadow-green-600'
      />
      <SingleStatsCard
        title='Bounce Rate '
        icon={<TbArrowBounce className='text-purple-600' />}
        helperText="Visits with out interaction"
        value={data?.visits.toLocaleString() + "%"|| ""}
        loading={loading}
        className='shadow-md shadow-purple-600'
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
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-sans text-muted-foreground'>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>
          {loading && (<Skeleton>
            <span className='opacity-0'>0</span>
            </Skeleton>
            )}
            {!loading && value}
        </div>
        <p className='text-xs text-muted-foreground pt-1'> {helperText}</p>
      </CardContent>
    </Card>
  );
}
