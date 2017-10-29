<?php

namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    public function index()
    {
        return $this->render('index.html.twig');
    }

    public function happiness()
    {
        return new JsonResponse(['result' => true]);
    }
}