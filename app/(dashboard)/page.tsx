import { Suspense } from 'react';
import { GetFormStats, GetForms } from '@/actions/form';
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import CreateFormBtn from '@/components/CreateFormBtn';
import { Form } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { formatDistance } from 'date-fns';
import { Button } from '@/components/ui/button';
import { BiRightArrowAlt } from "react-icons/bi";
import { FaEdit } from 'react-icons/fa';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='container '>
     
      <Suspense fallback={<StatsCard loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className='my-6'/>
      <h2 className='text-2xl font-bold text-orange-600 '>Your Forms</h2>
      <Separator  className='my-6'/>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
        <CreateFormBtn />
        <Suspense fallback={[1,2,3,4].map(el => (<FormCardSkeleton key={el} />))}>
          <FormCards />
        </Suspense>
        </div>

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

function FormCardSkeleton() {
  return <Skeleton className='border-2 border-primary-/20 h-[190px] w-full ' />
}
async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}
function FormCard({ form }: { form: Form }){
  return  <Card>
    <CardHeader>
      <CardTitle className='flex items-center gap-2 justify-center'>
        <span className='truncate font-semibold' >
          {form.name}
        </span>
        {form.published && <Badge >Published</Badge>}
        {!form.published && <Badge className='bg-blue-600' variant={"destructive"}>Draft</Badge>}
      </CardTitle>
      <CardDescription className='flex items-center justify-between text-muted-foreground text-sm'>
        {formatDistance(form.createdAt, new Date(), {
          addSuffix: true,
        })}
        {
          form.published &&  (
            <span className='flex items-center gap-2'>
              <LuView className="text-muted-foreground" />
              <span>{form.visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{form.submissions.toLocaleString()}</span>
            </span>
          )
        }
      </CardDescription>
    </CardHeader>
    <CardContent className='h-[20px] truncate text-sm text-muted-foreground'>
      {form.description || "No Description"}
    </CardContent>
    <CardFooter className='flex gap-2'>
        {!form.published && (
          <Button asChild className="w-full mt-2 text-md gap-4 h-full ">
            <Link href={`/forms/${form.id}`}>
              View submissions <BiRightArrowAlt />
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button asChild variant={"secondary"} className="w-full mt-2 text-md gap-4">
            <Link href={`/builder/${form.id}`}>
              Edit form <FaEdit />
            </Link>
          </Button>
        )}
      </CardFooter>
  </Card>
}