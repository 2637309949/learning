### The Contravariant type class is for functors that define a contramap function with the following type
    def contramap[A, B](fa: F[A])(f: B => A): F[B]
