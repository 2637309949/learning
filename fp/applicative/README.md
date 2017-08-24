### Definition
    trait Applicative[F[_]] extends Functor[F] {
        def ap[A, B](ff: F[A => B])(fa: F[A]): F[B]

        def pure[A](a: A): F[A]

        def map[A, B](fa: F[A])(f: A => B): F[B] = ap(pure(f))(fa)
    }
