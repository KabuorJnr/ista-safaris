import 'package:flutter/material.dart';

/// Phase 0 shell. The design system (Phase 1) replaces the theme and
/// the screens (Phase 2) replace the placeholder home.
void main() {
  runApp(const IstaApp());
}

class IstaApp extends StatelessWidget {
  const IstaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ISTA Safaris',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF23523B)),
        scaffoldBackgroundColor: const Color(0xFFFCFBF4),
      ),
      home: const Scaffold(
        body: Center(child: Text('ISTA Safaris')),
      ),
    );
  }
}
