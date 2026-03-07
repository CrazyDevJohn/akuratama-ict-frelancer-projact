export interface TypeProps {
  params: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface UserProps {
  courseEnrolled: [];
  createdAt: string;
  email: string;
  name: string;
  password: null;
  updatedAt: string;
  __v: number;
  _id: string;
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
  getUserById: (id: string) => any;
}

export interface BillInterface {
  courseId: string;
  studentId: string;
  isApruved: boolean;
  timeDuration: Date;
  billUrl: string;
  _id: string;
}

export interface BillingStoreInterface {
  allBilling: BillInterface[] | [];
  getBills: () => Promise<void>;
  aprureBill: (
    billId: string,
    studentId: string,
    courseId: string,
  ) => Promise<{ success: boolean; message: string }>;
}

export interface LessonInterface {
  title: string;
  description: string;
  pageNumber: number;
  // lectures: string[];
  videoUrl: string;
  courseId: string;
  _id: string;
}

interface LoadingState {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

interface useCourseProps {
  allCourses: CourseInterface[];
  // addedLectures: any[];
  allLessons: any[];
  getAllCourse: () => Promise<void>;
  getCourseById: (id: string) => Promise<any>;

  addCourse: (
    title: string,
    description: string,
    grade: string,
    price: number,
    image?: string,
  ) => void;
  createLesson: (
    title: string,
    description: string,
    pageNumber: number,
    lectures: any,
    courseId: string,
  ) => any;
  // createLecture: (
  //   title: string,
  //   description: string,
  //   pageNumber: number,
  //   resources: string,
  // ) => any;
  getAllLesson: () => Promise<void>;
  getLessonById: (id: string) => Promise<void>;
}

export interface SummaryItemProps {
  title: string;
  value: number | string;
}

export interface UseSummeryStoreProps {
  summary: SummaryItemProps[];

  getSummarys: () => Promise<Void>;
}
