export interface TypeProps {
  params: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface UserProps{
  courseEnrolled: [];
    createdAt: string;
    email: string;
    name: string;
    password: null;
    updatedAt: string;
    __v: number;
    _id: string
}

export interface CourseInterface {
  title: string;
  description: string;
  image?: string;
  id: number;
  price: number;
  grade: string;
}

export interface AutStoreInterface {
  user: UserProps | null;
  allUsers: UserProps[] | [];

  login: (email: string, pass: string) => void;
  checkAuth: () => void;
  logout: () => void;
  getAllUsers: () => void;
  getUserById: (id:string) => any;
}

export interface BillInterface{
      courseId: string,
    studentId: string,
    isApruved: boolean,
    timeDuration: Date,
    billUrl: string,
    _id: string
}
  
export interface BillingStoreInterface {
    allBilling: BillInterface[]| [],
    getBills:  () => void,
    aprureBill:  (billId:string, studentId:string, courseId:string) => void
}